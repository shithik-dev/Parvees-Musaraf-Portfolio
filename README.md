# Parvees Mushraf — Personal Portfolio & API

A modern, high-performance creative portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**, featuring a production-ready **Express / Nodemailer API backend** designed for **Vercel Serverless Function** deployment.

---

## 🚀 Features

- **Frontend**: Built with React 19, Vite 8, Tailwind CSS v4, and Framer Motion micro-animations.
- **Backend API**: Serverless Express handler delivering contact form validation and automated email notifications via SMTP / Nodemailer.
- **Vercel Ready**: Full zero-config deployment setup for both frontend static hosting and API serverless execution.

---

## 🛠️ Project Architecture

```
Parvees-Musaraf-Portfolio/
├── api/                      # Vercel Serverless Functions entrypoints
│   ├── index.js              # Catch-all Express handler for /api/*
│   ├── contact.js            # Contact route serverless handler
│   └── health.js             # API health check handler
├── server/                   # Backend Express core application
│   └── src/
│       ├── app.js            # Express app configuration & middleware
│       ├── controllers/      # Form controllers & payload validation
│       ├── routes/           # Express router definitions
│       └── services/         # Nodemailer SMTP transport service
├── src/                      # React Vite Frontend application
│   ├── components/           # UI components (Contact form, Hero, Projects, etc.)
│   ├── services/             # Frontend API client service
│   └── data/                 # Portfolio static content & configuration
├── vercel.json               # Vercel deployment & API rewrite configuration
├── package.json              # Project dependencies (Frontend + Serverless)
└── README.md                 # Deployment & setup documentation
```

---

## 📦 Environment Variables

To enable email delivery from the contact form, configure the following environment variables in your local `.env` file or in your **Vercel Project Settings**.

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `MAIL_HOST` | **Yes** | SMTP server address | `smtp.gmail.com` |
| `MAIL_PORT` | **Yes** | SMTP server port (`587` for TLS / `465` for SSL) | `587` |
| `MAIL_SECURE` | **No** | Set to `true` if using port 465 | `false` |
| `MAIL_USER` | **Yes** | Your SMTP account email address | `yourname@gmail.com` |
| `MAIL_PASSWORD` | **Yes** | SMTP password or Google App Password | `abcd efgh ijkl mnop` |
| `CONTACT_RECEIVER` | **Yes** | Email address where inquiry submissions are sent | `receiver@example.com` |
| `CLIENT_URL` | **No** | Allowed CORS origin (Defaults to allowing same domain) | `https://your-portfolio.vercel.app` |
| `VITE_API_URL` | **No** | Frontend API URL override (Defaults to `/api` in production) | `/api` |

---

## 🔑 How to Get a Gmail App Password (If using Gmail SMTP)

If you are using a Gmail account to send emails (`smtp.gmail.com`), you **must** use a Google App Password (not your regular account password):

1. Go to your [Google Account Settings](https://myaccount.google.com/).
2. Navigate to **Security** on the left menu.
3. Ensure **2-Step Verification** is turned **ON**.
4. In the search bar at the top of your Google Account page, search for **"App Passwords"**.
5. Create a new App Password:
   - App Name: `Portfolio Vercel`
6. Click **Create**. Google will generate a **16-character code** (e.g. `abcd efgh ijkl mnop`).
7. Copy this 16-character password and use it as `MAIL_PASSWORD` in your Vercel Environment Variables.

---

## 🌐 Step-by-Step Vercel Deployment Procedure

### Option A: Deploy via Vercel Dashboard (Recommended & Easiest)

#### Step 1: Push Code to GitHub / GitLab / Bitbucket
Ensure your repository is pushed to your Git provider:
```bash
git add .
git commit -m "Configure project for Vercel deployment with working contact form"
git push origin main
```

#### Step 2: Import Project in Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click the **"Add New..."** button in the top right and select **"Project"**.
3. Import your Git repository (`Parvees-Musaraf-Portfolio`).

#### Step 3: Configure Build & Project Settings
Vercel automatically detects Vite. Verify the settings:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Step 4: Add Environment Variables
Before clicking Deploy, expand the **Environment Variables** section and add all required SMTP credentials:

- `MAIL_HOST` = `smtp.gmail.com`
- `MAIL_PORT` = `587`
- `MAIL_SECURE` = `false`
- `MAIL_USER` = `your-email@gmail.com`
- `MAIL_PASSWORD` = `your-16-digit-app-password`
- `CONTACT_RECEIVER` = `your-email@gmail.com`

> 💡 **Tip:** Apply these environment variables to **Production**, **Preview**, and **Development** environments.

#### Step 5: Click Deploy
Click **Deploy**. Vercel will build your static assets and deploy your serverless API routes under `/api/*`.

---

### Option B: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login and Link Project
```bash
vercel login
vercel link
```

#### Step 3: Set Environment Variables via CLI
```bash
vercel env add MAIL_HOST
vercel env add MAIL_PORT
vercel env add MAIL_SECURE
vercel env add MAIL_USER
vercel env add MAIL_PASSWORD
vercel env add CONTACT_RECEIVER
```

#### Step 4: Deploy to Production
```bash
vercel --prod
```

---

## 🧪 Testing Your Deployed Contact Form

1. Open your live Vercel domain (e.g. `https://your-portfolio.vercel.app`).
2. Scroll to the **Contact Section** (`#contact`).
3. Fill in the form fields:
   - Your Name
   - Email
   - Project Type
   - Project Details
4. Click **SEND PROJECT INQUIRY**.
5. You should see a green success message: **`MESSAGE RECEIVED — Thank you for sharing your project...`**.
6. Check the recipient inbox (`CONTACT_RECEIVER`) to verify that the styled HTML email has arrived.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Run

1. Clone the repository and install root dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `server/.env` or root `.env`:
   ```env
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_SECURE=false
   MAIL_USER=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   CONTACT_RECEIVER=your-email@gmail.com
   PORT=5000
   ```

3. Run the development environment:
   ```bash
   # Terminal 1: Start Backend API
   npm --prefix server run dev

   # Terminal 2: Start Vite Frontend
   npm run dev
   ```

---

## 🛡️ Key Vercel Fixes Included in Codebase

- **Serverless API Proxy (`app.set("trust proxy", 1)`)**: Configured Express proxy trust so `express-rate-limit` works reliably behind Vercel serverless proxy infrastructure without dropping submissions or throwing proxy errors.
- **Route Rewrite (`vercel.json`)**: Configured Vercel rewrites so calls to `/api/contact` automatically route to Node serverless functions.
- **Route Normalization**: Rewrote `api/index.js` and `api/contact.js` handlers to prevent path duplication issues during Vercel invocation.
- **Environment Validation**: Added proactive SMTP configuration checks in `email.service.js` to log missing environment variables in Vercel logs for fast troubleshooting.

---

## ❓ Troubleshooting

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **"Email service configuration incomplete"** | Environment variables not set in Vercel. | Go to Vercel Dashboard -> Settings -> Environment Variables and add `MAIL_HOST`, `MAIL_USER`, `MAIL_PASSWORD`, `CONTACT_RECEIVER`. Redeploy afterwards. |
| **"Invalid login: 535-5.7.8 Username and Password not accepted"** | Incorrect Gmail password or using standard password instead of App Password. | Generate a 16-character **App Password** from Google Account Security settings. |
| **"Too many contact attempts"** | Rate limiting activated. | Wait 15 minutes or adjust the rate limit parameters in `server/src/app.js`. |
| **404 Not Found on `/api/contact`** | Vercel rewrite missing. | Ensure `vercel.json` exists in project root with the rewrite configuration. |
