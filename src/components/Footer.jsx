
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowUp,
  Camera,
  Briefcase,
  Mail,
  GitBranch,
} from "lucide-react";

import { contactInfo } from "../data/contact";

const navigation = [
  {
    label: "HOME",
    href: "#home",
  },
  {
    label: "WORK",
    href: "#work",
  },
  {
    label: "VIDEO EDITING",
    href: "#video-editing",
  },
  {
    label: "ABOUT",
    href: "#about",
  },
  {
    label: "SERVICES",
    href: "#services",
  },
  {
    label: "CONTACT",
    href: "#contact",
  },
];

const socialLinks = [
  {
    label: "INSTAGRAM",
    href: "https://www.instagram.com/parvez_muzzraf_?igsi=MTk2OWUxYzRwbzdlYg==",
    icon: Camera,
  },
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/parvees-musaraf-m-94104b354?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: Briefcase,
  },
  {
    label: "GITHUB",
    href: "https://github.com/Parveesmusraf",
    icon: GitBranch,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#080808] text-white">

      {/* =========================================
          FINAL CTA
      ========================================= */}
      <section className="border-t border-white/10 py-28 md:py-36 lg:py-44">
        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Label */}
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#c7ff35]" />

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                HAVE A PROJECT?
              </span>
            </div>

            {/* CTA Heading */}
            <h2 className="max-w-[1500px] font-display text-[15vw] font-black uppercase leading-[0.78] tracking-[-0.07em]">
              LET&apos;S
              <br />
              <span className="text-white/20">MAKE IT.</span>
            </h2>

            {/* CTA */}
            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group inline-flex w-fit items-center gap-8 bg-[#c7ff35] px-6 py-5 text-black transition-all duration-300 hover:bg-white sm:px-8"
              >
                <span className="relative z-[51] !text-black">
                  START A PROJECT
                </span>

                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="group inline-flex min-w-0 max-w-full flex-nowrap items-center gap-3 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em] text-white/40 transition-colors duration-300 hover:text-white sm:w-fit sm:text-xs sm:tracking-[0.2em]"
              >
                <Mail className="h-4 w-4" />

                {contactInfo.email}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          FOOTER CONTENT
      ========================================= */}
      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">

          <div className="grid border-x border-white/10 lg:grid-cols-[1.2fr_1fr_1fr]">

            {/* =====================================
                BRAND
            ===================================== */}
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex h-full flex-col justify-between">

                <div>
                  <p className="font-display text-3xl font-black uppercase tracking-[-0.05em] sm:text-4xl">
                    PARVEES<span className="text-[#c7ff35]">.</span>
                  </p>

                  <p className="mt-5 max-w-xs text-sm leading-7 text-white/35">
                    Graphic Designer &amp; Video Editor creating visual
                    identities, digital experiences and moving stories.
                  </p>
                </div>

                <div className="mt-12">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
                    BASED IN
                  </p>

                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-white/50">
                    {contactInfo.location}
                  </p>
                </div>

              </div>
            </div>

            {/* =====================================
                NAVIGATION
            ===================================== */}
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
                NAVIGATION
              </p>

              <nav className="grid grid-cols-2 gap-x-6 gap-y-5">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-1 w-1 bg-white/20 transition-colors duration-300 group-hover:bg-[#c7ff35]" />

                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* =====================================
                SOCIAL
            ===================================== */}
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="mb-8 font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
                CONNECT
              </p>

              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between border-b border-white/10 pb-4 text-white/40 transition-colors duration-300 hover:border-white/30 hover:text-white"
                    >
                      <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                        <Icon className="h-4 w-4" />

                        {social.label}
                      </span>

                      <ArrowUpRight className="h-4 w-4 text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7ff35]" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* =========================================
              BOTTOM BAR
          ========================================= */}
          <div className="flex flex-col gap-6 border-x border-t border-white/10 px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                © {currentYear} PARVEES
              </span>

              <span className="hidden h-1 w-1 bg-white/20 sm:block" />

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                ALL RIGHTS RESERVED
              </span>
            </div>

            {/* Back To Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex w-fit items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white"
            >
              BACK TO TOP

              <span className="flex h-8 w-8 items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-[#c7ff35]">
                <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-1" />
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* =========================================
          LARGE BACKGROUND WORD
      ========================================= */}
      <div className="pointer-events-none overflow-hidden border-t border-white/[0.03]">
        <div className="select-none whitespace-nowrap font-display text-[18vw] font-black uppercase leading-[0.7] tracking-[-0.08em] text-white/[0.025]">
          PARVEES — DESIGN — EDIT
        </div>
      </div>

    </footer>
  );
}
