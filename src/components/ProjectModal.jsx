import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Maximize2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectModal({
  project,
  projects,
  onClose,
  onPrevious,
  onNext,
}) {
  const [viewMode, setViewMode] = useState("image");

  useEffect(() => {
    setViewMode("image");
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose, onPrevious, onNext]);

  const currentIndex = projects.findIndex(
    (item) => item.id === project?.id,
  );

  const openFullscreen = () => {
    const image = document.getElementById("project-modal-image");

    if (image?.requestFullscreen) {
      image.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="fixed right-5 top-5 z-20 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/50 text-white transition-all hover:border-[#c7ff35] hover:bg-[#c7ff35] hover:text-black sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mx-auto flex min-h-screen w-full max-w-[1600px] items-center px-4 py-20 sm:px-8 lg:px-12">
            <div className="grid w-full gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
              {/* Media Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col overflow-hidden bg-[#101010]"
              >
                {project.pdf && (
                  <div className="flex border-b border-white/10 bg-[#0d0d0d]">
                    <button
                      type="button"
                      onClick={() => setViewMode("image")}
                      className={`flex-1 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                        viewMode === "image"
                          ? "border-b-2 border-[#c7ff35] bg-[#161616] font-bold text-[#c7ff35]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      Image Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("pdf")}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                        viewMode === "pdf"
                          ? "border-b-2 border-[#c7ff35] bg-[#161616] font-bold text-[#c7ff35]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      PDF Booklet Viewer
                    </button>
                  </div>
                )}

                {viewMode === "image" ? (
                  <>
                    <img
                      id="project-modal-image"
                      src={project.image}
                      alt={project.title}
                      className="max-h-[70vh] w-full object-contain"
                    />

                    {project.gallery?.length > 1 && (
                      <div className="grid grid-cols-2 gap-2 border-t border-white/10 bg-black/30 p-2">
                        {project.gallery.map((image, index) => (
                          <img
                            key={image}
                            src={image}
                            alt={`${project.title} view ${index + 1}`}
                            className="h-28 w-full object-cover opacity-70 transition hover:opacity-100"
                          />
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={openFullscreen}
                      aria-label="View image fullscreen"
                      className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/70 text-white transition hover:border-[#c7ff35] hover:text-[#c7ff35]"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="relative h-[72vh] w-full bg-[#141414]">
                    <iframe
                      src={project.pdf}
                      title={project.pdfTitle || project.title}
                      className="h-full w-full border-0"
                    />
                  </div>
                )}
              </motion.div>

              {/* Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                <p className="font-mono text-xs tracking-[0.25em] text-[#c7ff35]">
                  {String(project.id).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </p>

                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {project.categoryLabel}
                </p>

                <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  {project.title}
                </h2>

                <div className="my-8 h-px w-full bg-white/10" />

                <p className="max-w-lg text-base leading-relaxed text-white/55">
                  {project.description}
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c7ff35]">
                      Creative Direction
                    </p>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/45">
                      {project.creativeDirection}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c7ff35]">
                      Design Approach
                    </p>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/45">
                      {project.designApproach}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c7ff35]">
                      Deliverables
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                      {project.deliverables.map((deliverable) => (
                        <span key={deliverable} className="text-sm text-white/50">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {project.pdf && (
                  <div className="mt-8 border border-[#c7ff35]/30 bg-[#c7ff35]/5 p-5">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#c7ff35]" />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c7ff35]">
                          PDF BOOKLET INCLUDED (ARABIC & ENGLISH)
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {project.pdfTitle || "Cibo Menu 2025.pdf"}
                        </p>
                        <p className="mt-1 text-xs text-white/50">
                          Full high-resolution menu booklet available to view or download.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={project.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#c7ff35] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-black transition hover:bg-white"
                      >
                        <Eye className="h-4 w-4" />
                        Open PDF in New Tab
                      </a>

                      <a
                        href={project.pdf}
                        download="Cibo-Menu-2025.pdf"
                        className="flex items-center gap-2 border border-white/20 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-white transition hover:border-[#c7ff35] hover:text-[#c7ff35]"
                      >
                        <Download className="h-4 w-4" />
                        Download PDF (25.8 MB)
                      </a>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={onPrevious}
                    aria-label="Previous project"
                    className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 transition hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Previous
                  </button>

                  <span className="font-mono text-[10px] text-white/20">
                    {currentIndex + 1} / {projects.length}
                  </span>

                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next project"
                    className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 transition hover:text-white"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.15em] text-white/20">
                  ESC CLOSE · ← PREVIOUS · → NEXT
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}