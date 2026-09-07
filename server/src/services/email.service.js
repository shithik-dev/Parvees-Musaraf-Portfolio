import nodemailer from "nodemailer";

function getTransporter() {
  const port = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587;
  const secure = process.env.MAIL_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port,
    secure,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

export async function sendContactEmail({
  name,
  email,
  company,
  projectType,
  timeline,
  source,
  details,
  referenceLink,
}) {
  const requiredEnvs = ["MAIL_HOST", "MAIL_USER", "MAIL_PASSWORD", "CONTACT_RECEIVER"];
  const missingEnvs = requiredEnvs.filter((key) => !process.env[key]);

  if (missingEnvs.length > 0) {
    console.error(`Email config error. Missing variables: ${missingEnvs.join(", ")}`);
    throw new Error(
      `Email service configuration incomplete. Missing: ${missingEnvs.join(", ")}`
    );
  }

  const transporter = getTransporter();

  const mailOptions = {
    from: `"Parvees Portfolio" <${process.env.MAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER,

    replyTo: email,

    subject: `New Portfolio Inquiry — ${projectType}`,

    text: `
New project inquiry received from the Parvees Mushraf portfolio.

Name:
${name}

Email:
${email}

Company / Brand:
${company || "Not provided"}

Project Type:
${projectType}

Project Timeline:
${timeline || "Not provided"}



Project Details:
${details}


    `,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #111;">
        
        <div style="background: #080808; padding: 30px;">
          <h1 style="color: #c7ff35; margin: 0;">
            New Project Inquiry
          </h1>

          <p style="color: #ffffff; margin-top: 8px;">
            Parvees Mushraf Portfolio
          </p>
        </div>

        <div style="padding: 30px; border: 1px solid #eeeeee;">
          
          <h2>Client Information</h2>

          <p>
            <strong>Name:</strong><br />
            ${name}
          </p>

          <p>
            <strong>Email:</strong><br />
            ${email}
          </p>

          <p>
            <strong>Company / Brand:</strong><br />
            ${company || "Not provided"}
          </p>

          <hr />

          <h2>Project Information</h2>

          <p>
            <strong>Project Type:</strong><br />
            ${projectType}
          </p>

          <p>
            <strong>Timeline:</strong><br />
            ${timeline || "Not provided"}
          </p>

          <p>
            <strong>How did they find you?</strong><br />
            ${source || "Not provided"}
          </p>

          <hr />

          <h2>Project Details</h2>

          <p style="white-space: pre-line;">
            ${details}
          </p>

          <hr />

          <h2>Reference / Inspiration</h2>

          <p>
            ${
              referenceLink
                ? `<a href="${referenceLink}" target="_blank" rel="noopener noreferrer">
                    ${referenceLink}
                  </a>`
                : "Not provided"
            }
          </p>

        </div>

        <div style="padding: 20px; text-align: center; color: #888;">
          Sent from the Parvees Mushraf portfolio contact form.
        </div>

      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}