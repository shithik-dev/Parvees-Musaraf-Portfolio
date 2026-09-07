import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { profile } from "../data/profile";

export default function Hero() {
const heroRef = useRef(null);

const { scrollYProgress } = useScroll({
target: heroRef,
offset: ["start start", "end start"],
});

const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

return ( <section
   ref={heroRef}
   id="home"
   className="relative min-h-screen overflow-hidden bg-[#080808] text-white"
 >
{/* Main Hero Image */}
<motion.div
style={{
y: imageY,
scale: imageScale,
}}
className="absolute inset-0"
>
<img
src={profile.heroImages[0]}
alt={`${profile.name} — ${profile.profession}`}
className="h-full w-full object-cover object-center"
/>

```
    {/* Image overlays */}
    <div className="absolute inset-0 bg-black/35" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/20" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30" />
  </motion.div>

  {/* Subtle Grain */}
  <div className="grain pointer-events-none absolute inset-0 z-10 opacity-30" />

  {/* Hero Content */}
  <motion.div
    style={{ y: contentY }}
    className="relative z-40 flex min-h-screen flex-col justify-between px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-12 lg:pb-12 lg:pt-36"
  >
    {/* Top Information */}
    <div className="flex items-start justify-between gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#c7ff35]" />

          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 sm:text-xs">
            {profile.availability}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden text-right sm:block"
      >
      

        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          DESIGN / MOTION / VISUALS
        </p>
      </motion.div>
    </div>

    {/* Main Typography */}
    <div className="mt-auto">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-[#c7ff35] sm:text-sm">
          GRAPHIC DESIGNER
          <span className="mx-2 text-white/30">/</span>
          VIDEO EDITOR
        </p>

        <h1 className="font-display text-[15vw] font-bold uppercase leading-[0.78] tracking-[-0.07em] sm:text-[13vw] lg:text-[11vw]">
          <span className="block text-white">PARVEES</span>
          <span className="block text-white/25">MUSARAF</span>
        </h1>

        <p className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-white/60 sm:text-sm">
          Dubai, UAE
        </p>
      </motion.div>

      {/* Bottom Hero Information */}
      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="max-w-xl text-sm leading-7 text-white/60 sm:text-base md:text-lg">
            {profile.description}
          </p>

          {/* CTA */}
          <div className="relative z-[50] mt-7 flex flex-wrap gap-3">
            {/* Explore My Work */}
            <a
              href="#work"
              className="group relative z-[50] inline-flex items-center gap-3 bg-[#c7ff35] px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] !text-black opacity-100 shadow-[0_0_25px_rgba(199,255,53,0.25)] transition-all duration-300 hover:bg-white"
            >
              <span className="relative z-[51] !text-black">
                EXPLORE MY WORK
              </span>

              <ArrowUpRight className="relative z-[51] h-4 w-4 !text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Let's Talk */}
            <a
              href="#contact"
              className="group relative z-[50] inline-flex items-center gap-3 border border-white/25 bg-black/30 px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] !text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:!text-black"
            >
              <span>LET'S TALK</span>

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden items-center gap-4 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            SCROLL TO EXPLORE
          </span>

          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
            <ArrowDownRight className="h-4 w-4 text-[#c7ff35]" />
          </div>
        </motion.div>
      </div>
    </div>

    {/* Bottom Coordinates */}
    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
        PARVEES MUSARAF
      </span>

      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
        01 / 01
      </span>
    </div>
  </motion.div>
</section>


);
}
