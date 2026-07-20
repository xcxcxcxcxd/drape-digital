import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2026-06-24.dahlia",
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global rate limiter
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(globalLimiter);

  // Stricter API rate limiter for form submissions
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per 15 minutes
    message: { error: "Too many requests from this IP, please try again after 15 minutes" }
  });

  // Raw body parser for Stripe webhooks (must be before express.json())
  app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

  app.use(express.json());

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true, // 465 uses true
    auth: {
      user: process.env.SMTP_USER || "contact@drape.digital",
      pass: process.env.SMTP_PASS || "Zellijsetup2026@amine",
    },
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Contact form submission TS Handler
  app.post("/api/contact", apiLimiter, async (req, res) => {
    try {
      const { name, email, message, company } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Send email to agency
      await transporter.sendMail({
        from: `"Drape Digital Website" <contact@drape.digital>`, // Must send from authenticated email
        replyTo: email,
        to: process.env.AGENCY_EMAIL || "contact@drape.digital",
        subject: `New Contact Request from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage:\n${message}`,
      });

      // Autoresponder to lead (Custom template + Trustpilot BCC)
      await transporter.sendMail({
        from: `"Drape Digital" <contact@drape.digital>`,
        to: email,
        bcc: "drape.digital+d8a1d0a4c8@invite.trustpilot.com",
        subject: "Thank you for contacting Drape Digital",
        html: `<p>Hi ${name},</p>
               <p>Thanks for reaching out! We've received your request and our team is currently reviewing your details.</p>
               <p>We'll get back to you within 24 hours regarding your custom demo build.</p>
               <br>
               <p>Best regards,</p>
               <p><strong>Drape Digital Team</strong></p>`,
      });

      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });
  
  // Quote / Lead Magnet handler TS Handler
  app.post("/api/quote", apiLimiter, async (req, res) => {
    try {
      const { companyName, url, email, service } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Notify agency
      await transporter.sendMail({
        from: `"Drape Digital Website" <contact@drape.digital>`,
        replyTo: email,
        to: process.env.AGENCY_EMAIL || "contact@drape.digital",
        subject: `New Lead Magnet / Quote Request for ${service}`,
        text: `Email: ${email}\nService: ${service}\nCompany: ${companyName || 'N/A'}\nURL: ${url || 'N/A'}`,
      });

      // Autoresponder / Lead Magnet delivery (Custom template + Trustpilot BCC)
      await transporter.sendMail({
        from: `"Drape Digital" <contact@drape.digital>`,
        to: email,
        bcc: "drape.digital+d8a1d0a4c8@invite.trustpilot.com",
        subject: `Your Requested Resource: ${service} by Drape Digital`,
        html: `<p>Hi there,</p>
               <p>Thank you for your interest in our <strong>${service}</strong> expertise.</p>
               <p>Here is the resource you requested. Our team has put together these insights to help you scale and optimize your digital presence.</p>
               <p>A member of our team is manually reviewing your request and will follow up shortly with your tailored resource.</p>
               <br>
               <p>If you're interested in requesting a risk-free demo build, simply reply to this email.</p>
               <br>
               <p>Best regards,</p>
               <p><strong>Drape Digital Team</strong></p>`,
      });

      res.status(200).json({ success: true, message: "Quote request received" });
    } catch (error) {
      console.error("Error sending quote email:", error);
      res.status(500).json({ error: "Failed to send request" });
    }
  });

  // ─── Stripe Checkout Session ─────────────────────────────────
  app.post("/api/stripe/checkout", apiLimiter, async (req, res) => {
    try {
      const { serviceName, packageName, price, slug } = req.body;

      if (!serviceName || !packageName || !price) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Convert "$1,499" or "$999/mo" to integer cents
      const numericPrice = Math.round(parseFloat(price.replace(/[^0-9.]/g, "")) * 100);

      const isRecurring = price.includes("/mo");

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${serviceName} — ${packageName} Package`,
              description: `Drape Digital: ${serviceName} (${packageName})`,
              images: ["https://drape.digital/og-image.png"],
            },
            ...(isRecurring
              ? { recurring: { interval: "month" }, unit_amount: numericPrice }
              : { unit_amount: numericPrice }),
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: isRecurring ? "subscription" : "payment",
        line_items: lineItems,
        success_url: `https://drape.digital/payment-success?session_id={CHECKOUT_SESSION_ID}&service=${encodeURIComponent(serviceName)}`,
        cancel_url: `https://drape.digital/services/${slug}`,
        metadata: {
          serviceName,
          packageName,
          slug,
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: error.message || "Failed to create checkout session" });
    }
  });

  // ─── Stripe Webhook ───────────────────────────────────────────
  app.post("/api/stripe/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    let event: Stripe.Event;
    try {
      event = webhookSecret
        ? stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
        : JSON.parse(req.body.toString());
    } catch (err: any) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email || "";
      const serviceName = session.metadata?.serviceName || "our service";
      const packageName = session.metadata?.packageName || "";

      if (customerEmail) {
        try {
          await transporter.sendMail({
            from: `"Drape Digital" <contact@drape.digital>`,
            to: customerEmail,
            bcc: "drape.digital+d8a1d0a4c8@invite.trustpilot.com",
            subject: `Payment Confirmed — ${serviceName} (${packageName})`,
            html: `
              <p>Thank you for choosing Drape Digital!</p>
              <p>We've received your payment for <strong>${serviceName} — ${packageName} Package</strong>.</p>
              <p>Our team will be in touch within 24 hours to kick off your project.</p>
              <br>
              <p>Best regards,</p>
              <p><strong>Drape Digital Team</strong></p>
            `,
          });

          // Notify agency
          await transporter.sendMail({
            from: `"Drape Digital Website" <contact@drape.digital>`,
            to: process.env.AGENCY_EMAIL || "contact@drape.digital",
            subject: `New Payment: ${serviceName} — ${packageName}`,
            text: `New payment received.\nService: ${serviceName}\nPackage: ${packageName}\nCustomer: ${customerEmail}\nSession: ${session.id}`,
          });
        } catch (mailErr) {
          console.error("Failed to send confirmation email:", mailErr);
        }
      }
    }

    res.json({ received: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
