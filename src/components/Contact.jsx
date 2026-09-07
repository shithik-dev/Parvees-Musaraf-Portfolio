
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
} from "lucide-react";

import {
  contactInfo,
  projectTypes,
  timelineOptions,
} from "../data/contact";
import { submitContactForm } from "../services/contact.service";

const initialForm = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  timeline: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  // =========================
  // HANDLE INPUT CHANGES
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  // =========================
  // FORM VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.projectType) {
      newErrors.projectType = "Please select a project type.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please tell me about your project.";
    } else if (form.message.trim().length < 20) {
      newErrors.message =
        "Please provide a little more detail about your project.";
    }

    return newErrors;
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      await submitContactForm({
        ...form,
        details: form.message,
      });

      setStatus("success");
      setErrors({});
      setForm(initialForm);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080808] py-28 text-white md:py-36 lg:py-44"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-20 md:mb-28"
        >
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#c7ff35]" />

            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              CONTACT
            </span>
          </div>

          <h2 className="font-display text-[15vw] font-black uppercase leading-[0.78] tracking-[-0.07em] text-white sm:text-[12vw] md:text-[11vw] lg:text-[10vw]">
            LET&apos;S
            <br />

            <span className="text-white/25">
              CREATE.
            </span>
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
            Have a project, idea or visual challenge in mind?
            Tell me about it and let&apos;s explore what we can
            create together.
          </p>
        </motion.div>

        {/* =========================
            CONTACT CONTENT
        ========================= */}

        <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">

          {/* =========================
              CONTACT INFORMATION
          ========================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col"
          >

            {/* Availability */}

            <div className="border-y border-white/10 py-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                AVAILABILITY
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#c7ff35]" />

                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  {contactInfo.availability}
                </span>
              </div>
            </div>

            {/* Email */}

            <a
              href={`mailto:${contactInfo.email}`}
              className="group border-b border-white/10 py-6 transition-colors duration-300 hover:border-[#c7ff35]"
            >
              <div className="flex items-start justify-between gap-4 sm:gap-6">

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                    EMAIL
                  </p>

                  <p className="mt-3 max-w-full break-all text-lg text-white/70 transition-colors duration-300 group-hover:text-white md:text-xl">
                    {contactInfo.email}
                  </p>
                </div>

                <Mail className="mt-1 h-5 w-5 shrink-0 text-white/20 transition-colors duration-300 group-hover:text-[#c7ff35]" />
              </div>
            </a>

            {/* Location */}

            <div className="border-b border-white/10 py-6">
              <div className="flex items-start justify-between gap-6">

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                    BASED IN
                  </p>

                  <p className="mt-3 text-lg text-white/70 md:text-xl">
                    {contactInfo.location}
                  </p>
                </div>

                <MapPin className="mt-1 h-5 w-5 text-white/20" />
              </div>
            </div>

            {/* Statement */}

            <div className="mt-auto pt-10">
              <p className="font-display text-2xl font-bold uppercase leading-tight tracking-[-0.03em] text-white/80 md:text-3xl">
                GOOD IDEAS
                <br />
                DESERVE GREAT
                <br />

                <span className="text-[#c7ff35]">
                  VISUALS.
                </span>
              </p>
            </div>
          </motion.div>

          {/* =========================
              PROJECT INQUIRY FORM
          ========================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-white/10 p-6 sm:p-8 md:p-10"
            >

              {/* =========================
                  FORM HEADER
              ========================= */}

              <div className="mb-10 flex items-start justify-between gap-6">

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#c7ff35]">
                    PROJECT INQUIRY
                  </p>

                  <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-[-0.04em] md:text-4xl">
                    TELL ME ABOUT IT.
                  </h3>
                </div>

                <span className="font-mono text-[10px] text-white/20">
                  01 / FORM
                </span>
              </div>

              {/* =========================
                  NAME + EMAIL
              ========================= */}

              <div className="grid gap-6 md:grid-cols-2">

                {/* Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                  >
                    YOUR NAME *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className={`w-full border bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:bg-white/[0.04] ${
                      errors.name
                        ? "border-red-400/60"
                        : "border-white/10 focus:border-[#c7ff35]"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                  >
                    EMAIL *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full border bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:bg-white/[0.04] ${
                      errors.email
                        ? "border-red-400/60"
                        : "border-white/10 focus:border-[#c7ff35]"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* =========================
                  COMPANY + PROJECT TYPE
              ========================= */}

              <div className="mt-6 grid gap-6 md:grid-cols-2">

                {/* Company */}

                <div>
                  <label
                    htmlFor="company"
                    className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                  >
                    COMPANY / BRAND

                    <span className="ml-2 text-white/20">
                      OPTIONAL
                    </span>
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company or brand name"
                    autoComplete="organization"
                    className="w-full border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#c7ff35] focus:bg-white/[0.04]"
                  />
                </div>

                {/* Project Type */}

                <div>
                  <label
                    htmlFor="projectType"
                    className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                  >
                    PROJECT TYPE *
                  </label>

                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.projectType)}
                    className={`w-full appearance-none border bg-[#0c0c0c] px-4 py-4 text-sm outline-none transition-all duration-300 ${
                      form.projectType
                        ? "text-white"
                        : "text-white/20"
                    } ${
                      errors.projectType
                        ? "border-red-400/60"
                        : "border-white/10 focus:border-[#c7ff35]"
                    }`}
                  >
                    <option value="" disabled>
                      Select project type
                    </option>

                    {projectTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-[#0c0c0c] text-white"
                      >
                        {type}
                      </option>
                    ))}
                  </select>

                  {errors.projectType && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.projectType}
                    </p>
                  )}
                </div>
              </div>

              {/* =========================
                  PROJECT TIMELINE
              ========================= */}

              <div className="mt-6">

                <label
                  htmlFor="timeline"
                  className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                >
                  PROJECT TIMELINE

                  <span className="ml-2 text-white/20">
                    OPTIONAL
                  </span>
                </label>

                <select
                  id="timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  className={`w-full appearance-none border border-white/10 bg-[#0c0c0c] px-4 py-4 text-sm outline-none transition-all duration-300 focus:border-[#c7ff35] ${
                    form.timeline
                      ? "text-white"
                      : "text-white/20"
                  }`}
                >
                  <option value="" disabled>
                    Select timeline
                  </option>

                  {timelineOptions.map((timeline) => (
                    <option
                      key={timeline}
                      value={timeline}
                      className="bg-[#0c0c0c] text-white"
                    >
                      {timeline}
                    </option>
                  ))}
                </select>
              </div>

              {/* =========================
                  PROJECT DETAILS
              ========================= */}

              <div className="mt-6">

                <label
                  htmlFor="message"
                  className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40"
                >
                  PROJECT DETAILS *
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, goals, audience, requirements and anything else that might be useful..."
                  aria-invalid={Boolean(errors.message)}
                  className={`w-full resize-none border bg-white/[0.02] px-4 py-4 text-sm leading-7 text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:bg-white/[0.04] ${
                    errors.message
                      ? "border-red-400/60"
                      : "border-white/10 focus:border-[#c7ff35]"
                  }`}
                />

                {errors.message && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* =========================
                  STATUS
              ========================= */}

              {status === "success" && (
  <div
    role="status"
    className="mt-6 flex items-start gap-3 border border-[#c7ff35]/20 bg-[#c7ff35]/5 p-4"
  >
    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c7ff35]" />

    <div>
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#c7ff35]">
        MESSAGE RECEIVED
      </p>

      <p className="mt-1 text-sm leading-6 text-white/70">
        Thank you for sharing your project — I&apos;ll be in touch soon.
      </p>
    </div>
  </div>
)}

              {status === "error" && (
                <div
                  role="alert"
                  className="mt-6 border border-red-400/20 bg-red-400/5 p-4"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-red-400">
                    PLEASE CHECK THE FORM
                  </p>

                  <p className="mt-1 text-sm text-white/40">
                    Some required information is missing or invalid.
                  </p>
                </div>
              )}

              {/* =========================
                  SUBMIT
              ========================= */}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-8 flex w-full items-center justify-between bg-[#c7ff35] px-6 py-5 text-black transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#c7ff35] focus:ring-offset-2 focus:ring-offset-[#080808]"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                  {status === "submitting"
                    ? "SENDING INQUIRY..."
                    : "SEND PROJECT INQUIRY"}
                </span>

                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* =========================
            BOTTOM
        ========================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 border-t border-white/10 pt-5 md:mt-28"
        >
          <div className="flex items-center justify-between">

            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
              CONTACT
            </span>

            <ArrowDownRight className="h-4 w-4 text-[#c7ff35]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}



