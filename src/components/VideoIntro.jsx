import { motion } from "framer-motion";
import { videos } from "../data/videos";

export default function VideoIntro() {
  const introVideo = videos[0];

  return (
    <section
      id="videos"
      className="relative overflow-hidden bg-[#080808] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#c7ff35]" />

                <span className="font-mono text-[10px] tracking-[0.25em] text-[#c7ff35]">
                  THE ART OF VISUAL COMMUNICATION
                </span>
              </div>

          <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem]">
            WHAT IS
            <br />
            <span className="text-white/30">GRAPHIC DESIGN?</span>
          </h2>
        </motion.div>

        {/* WIDE AUTOPLAY VIDEO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1 }}
          className="relative w-full overflow-hidden bg-black"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black sm:aspect-[2/1] lg:aspect-[1283/360]">
            <video
              src={introVideo.video}
              poster={introVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          {/* Cinematic overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          {/* Playing indicator */}
          <div className="pointer-events-none absolute right-5 top-5 flex items-center gap-2 sm:right-8 sm:top-8">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c7ff35]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              Playing
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
        >
          <p className="max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
            {introVideo.description}
          </p>

          <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
            SOUND OFF / LOOPING
          </div>
        </motion.div>
      </div>
    </section>
  );
}