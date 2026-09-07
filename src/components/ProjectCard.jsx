import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index, onClick }) {
return (
<motion.article
layout
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 30 }}
transition={{
duration: 0.6,
delay: Math.min(index * 0.06, 0.4),
}}
className={`group relative cursor-pointer ${
        project.size === "large"
          ? "md:col-span-2"
          : project.size === "small"
            ? "md:col-span-1"
            : "md:col-span-1"
      }`}
onClick={() => onClick(project)}
>
{/* Image Container */}
<div
className={`relative overflow-hidden bg-[#101010] ${
          project.size === "portrait"
            ? "aspect-[4/5]"
            : project.size === "landscape"
              ? "aspect-[16/10]"
              : project.size === "small"
                ? "aspect-[4/3]"
                : "aspect-[16/10]"
        }`}
>
{/* Main Image */}
<motion.img
src={project.image}
alt={project.title}
loading={index < 4 ? "eager" : "lazy"}
className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
/>

```
    {/* Permanent Dark Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

    {/* Top Metadata */}
    <div className="absolute left-5 right-5 top-5 z-10 flex items-start justify-between">
      <span className="font-mono text-[10px] tracking-[0.2em] text-white/80">
        {String(project.id).padStart(2, "0")}
      </span>

      <div className="flex items-center gap-2">
        {project.pdf && (
          <span className="border border-[#c7ff35]/40 bg-black/60 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-[#c7ff35]">
            PDF BOOKLET
          </span>
        )}
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#c7ff35]">
          {project.categoryLabel}
        </span>
      </div>
    </div>

    {/* Center View Project Button - ALWAYS VISIBLE */}
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.3 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-[#c7ff35] text-[#080808] shadow-[0_0_30px_rgba(199,255,53,0.2)] transition-all duration-300 group-hover:shadow-[0_0_45px_rgba(199,255,53,0.35)]"
      >
        <div className="text-center">
          <ArrowUpRight className="mx-auto mb-1 h-5 w-5" />

          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em]">
            VIEW
            <br />
            PROJECT
          </span>
        </div>
      </motion.div>
    </div>

    {/* Bottom Project Information - ALWAYS VISIBLE */}
    <div className="absolute bottom-5 left-5 right-5 z-10">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c7ff35]">
        {project.categoryLabel}
      </p>

      <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-[-0.03em] text-white md:text-3xl">
        {project.title}
      </h3>
    </div>
  </div>

  {/* Mobile Metadata */}
  <div className="mt-4 md:hidden">
    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c7ff35]">
      {project.categoryLabel}
    </p>

    <h3 className="mt-1 font-display text-xl uppercase text-white">
      {project.title}
    </h3>
  </div>
</motion.article>


);
}
