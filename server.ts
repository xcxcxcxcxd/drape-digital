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

  // Geo-blocking Middleware
  const BLOCKED_COUNTRIES = ["IN", "PK", "DZ"];

  app.use((req, res, next) => {
    // Use Vercel's geographic headers or default to US for local dev if missing
    const country = (req.headers["x-vercel-ip-country"] as string) || "US";
    
    if (BLOCKED_COUNTRIES.includes(country.toUpperCase())) {
      return res.status(403).json({ error: "Access denied from your region." });
    }
    
    next();
  });

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
  app.get("/api/geo", (req, res) => {
    const country = (req.headers["x-vercel-ip-country"] as string) || "US";
    res.json({ country });
  });

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
        html: `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #00D1FF;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Hi ${name},</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Thanks for reaching out! We've successfully received your request, and our team is currently reviewing your details.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">At Drape Digital, we build your custom demo <strong>before you pay anything</strong>. We will get back to you within 24 hours regarding the next steps for your build.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">In the meantime, feel free to browse some of our recent work or reply directly to this email if you have any immediate questions.</p>
      <div style="margin-top: 32px; margin-bottom: 32px;">
        <a href="https://drape.digital/#portfolio" style="background-color: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">View Our Recent Work</a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best regards,<br/><strong>The Drape Digital Team</strong></p>
    </div>
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #eaeaea;">
      <p style="margin: 0;">Drape Digital Agency, Tetouan, Morocco</p>
      <p style="margin: 8px 0 0 0;"><a href="https://drape.digital" style="color: #111; text-decoration: underline;">drape.digital</a> | <a href="https://www.linkedin.com/company/drapedigital/" style="color: #111; text-decoration: underline;">LinkedIn</a></p>
    </div>
  </div>
`,
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
        html: `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #00D1FF;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Hi there,</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Thank you for your interest in our <strong>${service}</strong> expertise.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Our team has put together these exclusive insights to help you scale and optimize your digital presence. A member of our team is manually reviewing your request and will follow up shortly with your tailored resource.</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-left: 4px solid #111; margin: 24px 0; border-radius: 0 6px 6px 0;">
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #374151;"><strong>Ready to see it in action?</strong> Request a completely risk-free, custom demo build. We build first, you pay only if you love it.</p>
      </div>
      <div style="margin-top: 32px; margin-bottom: 32px;">
        <a href="mailto:contact@drape.digital?subject=Demo%20Request" style="background-color: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">Request Your Free Demo</a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best regards,<br/><strong>The Drape Digital Team</strong></p>
    </div>
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #eaeaea;">
      <p style="margin: 0;">Drape Digital Agency, Tetouan, Morocco</p>
      <p style="margin: 8px 0 0 0;"><a href="https://drape.digital" style="color: #111; text-decoration: underline;">drape.digital</a> | <a href="https://www.linkedin.com/company/drapedigital/" style="color: #111; text-decoration: underline;">LinkedIn</a></p>
    </div>
  </div>
`,
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
      const { serviceName, packageName, price, currency = "USD", isRecurring = false, slug } = req.body;

      if (!serviceName || !packageName || !price) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // 'price' from frontend is now already a raw number string
      const numericPrice = Math.round(parseFloat(price) * 100);

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
          price_data: {
            currency: currency.toLowerCase(),
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
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #00D1FF;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Thank you for choosing Drape Digital!</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">We're thrilled to partner with you. We have successfully received your payment for the <strong>${serviceName} — ${packageName} Package</strong>.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Our team is already preparing everything on our end, and we will be in touch within the next 24 hours to kick off your project.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">If you need to share any assets, brand guidelines, or additional details right away, simply reply to this email.</p>
      <div style="margin-top: 32px; margin-bottom: 32px;">
        <a href="https://drape.digital" style="background-color: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">Return to Site</a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best regards,<br/><strong>The Drape Digital Team</strong></p>
    </div>
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #eaeaea;">
      <p style="margin: 0;">Drape Digital Agency, Tetouan, Morocco</p>
      <p style="margin: 8px 0 0 0;"><a href="https://drape.digital" style="color: #111; text-decoration: underline;">drape.digital</a> | <a href="https://www.linkedin.com/company/drapedigital/" style="color: #111; text-decoration: underline;">LinkedIn</a></p>
    </div>
  </div>
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
