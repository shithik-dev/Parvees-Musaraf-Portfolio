import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { categories, portfolioProjects } from "../data/portfolio";
import CategoryFilter from "./CategoryFilter";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return portfolioProjects;
    }

    return portfolioProjects.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory]);

  const handlePrevious = () => {
    if (!selectedProject) return;

    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === selectedProject.id,
    );

    const previousIndex =
      currentIndex <= 0
        ? filteredProjects.length - 1
        : currentIndex - 1;

    setSelectedProject(filteredProjects[previousIndex]);
  };

  const handleNext = () => {
    if (!selectedProject) return;

    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === selectedProject.id,
    );

    const nextIndex =
      currentIndex >= filteredProjects.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedProject(filteredProjects[nextIndex]);
  };

  return (
    <>
      <section
        id="work"
        className="relative overflow-hidden bg-[#080808] py-28 md:py-36 lg:py-44"
      >
        <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="grid gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#c7ff35]" />

                <span className="font-mono text-[10px] tracking-[0.25em] text-[#c7ff35]">
                  WORK
                </span>
              </div>

              <h2 className="font-display text-6xl font-bold uppercase leading-[0.85] tracking-[-0.05em] text-white sm:text-7xl md:text-8xl lg:text-[9rem]">
                MY
                <br />
                <span className="text-white/25">WORK.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-md text-lg leading-relaxed text-white/45 lg:pb-3 lg:text-xl"
            >
              A collection of identities, campaigns, product visuals and
              creative systems.
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="my-12 h-px origin-left bg-white/10 md:my-16"
          />

          {/* Categories */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Project count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              {filteredProjects.length} PROJECT
              {filteredProjects.length !== 1 ? "S" : ""}
            </p>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
              {activeCategory === "all"
                ? "ALL CATEGORIES"
                : categories.find((category) => category.id === activeCategory)
                    ?.label}
            </p>
          </div>

          {/* Editorial Gallery */}
          <motion.div
            layout
            className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center border border-white/10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                No projects available
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        projects={filteredProjects}
        onClose={() => setSelectedProject(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}