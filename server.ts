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
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #FF6B00;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Hi ${name},</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Thanks for reaching out! We've successfully received your request.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">At Drape Digital, we build websites for emergency call-out trades. We build the homepage first and you see it live before you pay anything.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">We will get back to you within 24 hours.</p>
      <div style="margin-top: 32px; margin-bottom: 32px;">
        <a href="https://drape.digital/work" style="background-color: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">View Our Recent Work</a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best regards,<br/><strong>The Drape Digital Team</strong></p>
    </div>
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #eaeaea;">
      <p style="margin: 0;">Drape Digital Agency, Tetouan, Morocco</p>
      <p style="margin: 8px 0 0 0;"><a href="https://drape.digital" style="color: #111; text-decoration: underline;">drape.digital</a></p>
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
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #FF6B00;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Hi there,</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Thank you for your interest in our <strong>${service}</strong> expertise.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">A member of our team is manually reviewing your request and will follow up shortly with your tailored resource.</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-left: 4px solid #FF6B00; margin: 24px 0; border-radius: 0 6px 6px 0;">
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #374151;"><strong>Ready to see it in action?</strong> Request a completely risk-free, custom demo build. We build first, you pay only if you love it.</p>
      </div>
      <div style="margin-top: 32px; margin-bottom: 32px;">
        <a href="https://drape.digital/free-homepage" style="background-color: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">Get a Free Homepage</a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best regards,<br/><strong>The Drape Digital Team</strong></p>
    </div>
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #eaeaea;">
      <p style="margin: 0;">Drape Digital Agency, Tetouan, Morocco</p>
      <p style="margin: 8px 0 0 0;"><a href="https://drape.digital" style="color: #111; text-decoration: underline;">drape.digital</a></p>
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

  // ─── Free Homepage Request Handler ──────────────────────────────────
  app.post("/api/free-homepage", apiLimiter, async (req, res) => {
    try {
      const { name, email, phone, businessName, trade, currentSite } = req.body;

      if (!name || !email || !businessName || !trade) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Notify agency
      await transporter.sendMail({
        from: `"Drape Digital Website" <contact@drape.digital>`,
        replyTo: email,
        to: process.env.AGENCY_EMAIL || "contact@drape.digital",
        subject: `Free Homepage Request: ${businessName} (${trade})`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nBusiness: ${businessName}\nTrade: ${trade}\nSite: ${currentSite || 'N/A'}`,
      });

      // Autoresponder to lead
      await transporter.sendMail({
        from: `"Drape Digital" <contact@drape.digital>`,
        to: email,
        subject: "Your free homepage request",
        html: `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #FF6B00;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Hi ${name},</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">We've received your request for a free homepage for <strong>${businessName}</strong>.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">We'll review your details and reach out within 24 hours to schedule the 15-minute intro call. On that call, we just need to confirm your prices and service area.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">After the call, we'll build the page and send you the live link within three days.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Speak soon.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best,<br/><strong>The Drape Digital Team</strong></p>
    </div>
  </div>
`,
      });

      res.status(200).json({ success: true, message: "Request received" });
    } catch (error) {
      console.error("Error sending free homepage email:", error);
      res.status(500).json({ error: "Failed to send request" });
    }
  });

  // ─── Stripe Checkout Session ─────────────────────────────────
  app.post("/api/stripe/checkout", apiLimiter, async (req, res) => {
    try {
      const { serviceName, packageName, price, currency = "USD", isRecurring = false, slug, customerName, customerEmail, customerPhone, businessName } = req.body;

      if (!serviceName || !packageName || !price || !customerEmail || !customerName) {
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
        customer_email: customerEmail,
        payment_method_types: ["card"],
        mode: isRecurring ? "subscription" : "payment",
        line_items: lineItems,
        success_url: `https://drape.digital/payment-success?session_id={CHECKOUT_SESSION_ID}&service=${encodeURIComponent(serviceName)}`,
        cancel_url: `https://drape.digital/payment-failed`,
        metadata: {
          serviceName,
          packageName,
          slug,
          customerName,
          customerEmail,
          customerPhone: customerPhone || "N/A",
          businessName: businessName || "N/A",
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: error.message || "Failed to create checkout session" });
    }
  });

  // ─── Stripe Verify Session ───────────────────────────────────
  app.get("/api/stripe/verify-session", apiLimiter, async (req, res) => {
    try {
      const sessionId = req.query.session_id as string;
      if (!sessionId) {
        return res.status(400).json({ error: "Missing session_id" });
      }
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.json({ status: session.payment_status });
    } catch (error) {
      console.error("Session verification error:", error);
      res.status(500).json({ error: "Failed to verify session" });
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
      const customerEmail = session.customer_details?.email || session.metadata?.customerEmail || "";
      const serviceName = session.metadata?.serviceName || "our service";
      const packageName = session.metadata?.packageName || "";
      const customerName = session.metadata?.customerName || "N/A";
      const customerPhone = session.metadata?.customerPhone || "N/A";
      const businessName = session.metadata?.businessName || "N/A";

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
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #FF6B00;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Payment Confirmed</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">We have successfully received your payment for the <strong>${serviceName} — ${packageName}</strong>.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Our team is already preparing everything on our end, and we will be in touch within the next 24 hours.</p>
      <div style="margin-top: 32px; margin-bottom: 32px;">
        <a href="https://drape.digital" style="background-color: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">Return to Site</a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best regards,<br/><strong>The Drape Digital Team</strong></p>
    </div>
    <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #eaeaea;">
      <p style="margin: 0;">Drape Digital Agency, Tetouan, Morocco</p>
      <p style="margin: 8px 0 0 0;"><a href="https://drape.digital" style="color: #111; text-decoration: underline;">drape.digital</a></p>
    </div>
  </div>
`,
          });

          // Notify agency
          await transporter.sendMail({
            from: `"Drape Digital Website" <contact@drape.digital>`,
            to: process.env.AGENCY_EMAIL || "contact@drape.digital",
            subject: `New Payment: ${serviceName} — ${packageName}`,
            text: `New payment received.\n\nCustomer Details:\nName: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone}\nBusiness: ${businessName}\n\nService: ${serviceName}\nPackage: ${packageName}\nSession: ${session.id}`,
          });
        } catch (mailErr) {
          console.error("Failed to send confirmation email:", mailErr);
        }
      }
    } else if (event.type === "payment_intent.payment_failed" || event.type === "invoice.payment_failed") {
      const dataObject = event.data.object as any;
      const customerEmail = dataObject.customer_email || dataObject.receipt_email || "";
      const customerId = dataObject.customer;

      let emailToSend = customerEmail;

      if (!emailToSend && customerId) {
        try {
          const customer = await stripe.customers.retrieve(customerId as string) as Stripe.Customer;
          emailToSend = customer.email || "";
        } catch (e) {
          console.error("Could not retrieve customer email for failed payment.");
        }
      }

      if (emailToSend) {
        try {
          await transporter.sendMail({
            from: `"Drape Digital" <contact@drape.digital>`,
            to: emailToSend,
            subject: "Payment Failed — Drape Digital",
            html: `
  <div style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #000; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; font-family: Inter, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: -1px;">drape<span style="color: #FF6B00;">.</span>digital</h1>
    </div>
    <div style="padding: 40px 30px;">
      <h2 style="color: #111; margin-top: 0;">Payment Declined</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">We attempted to process your recent payment, but unfortunately it failed.</p>
      <p style="font-size: 16px; line-height: 1.6; color: #444;">Your project or subscription will remain paused until the payment goes through. Please update your billing details or use a different payment method.</p>
      <div style="margin-top: 32px; margin-bottom: 32px;">
        <a href="https://drape.digital/pricing" style="background-color: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">Try Again / Return to Site</a>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 0;">Best regards,<br/><strong>The Drape Digital Team</strong></p>
    </div>
  </div>
`,
          });
        } catch (mailErr) {
          console.error("Failed to send failure email:", mailErr);
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
