import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { profile } from "../data/profile";

export default function About() {
  const [isImageColor, setIsImageColor] = useState(false);

  const toggleImageColor = () => setIsImageColor((isColor) => !isColor);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#080808] py-28 text-white sm:py-36 md:py-44 lg:py-52"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between border-b border-white/10 pb-6 md:mb-24"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#c7ff35]" />

              <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                ABOUT
              </p>
            </div>

            <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-[-0.05em] sm:text-6xl md:text-8xl lg:text-[9rem]">
              ABOUT
              <span className="text-white/20"> ME.</span>
            </h2>
          </div>

          <div className="hidden h-14 w-14 items-center justify-center rounded-full border border-white/20 md:flex">
            <ArrowDownRight className="h-5 w-5 text-[#c7ff35]" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
              <img
                src={profile.heroImages[1]}
                alt={`${profile.name} — ${profile.profession}`}
                onClick={toggleImageColor}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleImageColor();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isImageColor}
                className={`h-full w-full cursor-pointer object-cover transition duration-700 hover:scale-105 ${isImageColor ? "grayscale-0" : "grayscale hover:grayscale-0"}`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                  CREATIVE PRACTITIONER
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              <span>PARVEES MUSARAF</span>
              <span>ABOUT / 01</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="mb-8 max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {profile.philosophy}
            </p>

            <div className="mb-10 h-px w-full bg-white/10" />

            <p className="max-w-2xl text-base leading-8 text-white/50 md:text-lg">
              {profile.about}
            </p>

            {/* Capabilities */}
            <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#c7ff35]">
                  DESIGN
                </p>

                <ul className="space-y-2 text-sm uppercase tracking-wide text-white/60">
                  <li>Branding</li>
                  <li>Typography</li>
                  <li>Layout</li>
                  <li>Art Direction</li>
                  <li>Social Media Design</li>
                </ul>
              </div>

              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#c7ff35]">
                  VIDEO
                </p>

                <ul className="space-y-2 text-sm uppercase tracking-wide text-white/60">
                  <li>Video Editing</li>
                  <li>Color Grading</li>
                  <li>Motion Graphics</li>
                  <li>Sound Design</li>
                  <li>Visual Effects</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}