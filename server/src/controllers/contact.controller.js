import { sendContactEmail } from "../services/email.service.js";

export async function submitContactForm(req, res, next) {
  try {
    const {
      name,
      email,
      company,
      projectType,
      timeline,
      details: submittedDetails,
      message,
    } = req.body;

    const details = submittedDetails || message;

    // Required fields
    if (!name || !email || !projectType || !details) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide your name, email, project type and project details.",
      });
    }

    // Name validation
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Project details validation
    if (details.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide more details about your project.",
      });
    }

    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim(),
      projectType: projectType.trim(),
      timeline: timeline?.trim(),
      details: details.trim(),
    });

    return res.status(200).json({
      success: true,
      message:
        "Thank you! Your project inquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    next(error);
  }
}