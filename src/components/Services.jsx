
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { services } from "../data/services";

export default function Services() {
  const [activeServiceId, setActiveServiceId] = useState(null);

  const toggleService = (serviceId) => {
    setActiveServiceId((currentId) => (
      currentId === serviceId ? null : serviceId
    ));
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#080808] py-28 text-white sm:py-36 md:py-44 lg:py-52"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b border-white/10 pb-8 md:mb-24"
        >
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#c7ff35]" />

                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                  SERVICES
                </p>
              </div>

              <h2 className="font-display text-5xl font-bold uppercase leading-[0.85] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[9rem]">
                WHAT I
                <br />
                <span className="text-white/20">DO.</span>
              </h2>
            </div>

            <div className="hidden max-w-sm pb-2 md:block">
              <p className="text-sm leading-7 text-white/40">
                From visual identities to cinematic edits, every project is
                approached with intention, clarity and a strong visual point
                of view.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services List */}
        <div className="border-t border-white/10">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: Math.min(index * 0.04, 0.25),
              }}
              className={`group border-b border-white/10 ${activeServiceId === service.id ? "is-active" : ""}`}
              onClick={() => toggleService(service.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleService(service.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={activeServiceId === service.id}
            >
              <div className="grid gap-6 py-8 md:grid-cols-[80px_1fr_auto] md:items-center md:gap-10 md:py-12 lg:grid-cols-[100px_1fr_0.8fr_auto]">

                {/* Number */}
                <div className="font-mono text-xs tracking-[0.2em] text-white/30">
                  {service.number}
                </div>

                {/* Title */}
                <div>
                  <h3 className={`font-display text-3xl font-semibold uppercase leading-none tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#c7ff35] sm:text-4xl md:text-5xl lg:text-6xl ${activeServiceId === service.id ? "text-[#c7ff35]" : ""}`}>
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="max-w-md">
                  <p className={`text-sm leading-7 text-white/40 transition-colors duration-300 group-hover:text-white/60 ${activeServiceId === service.id ? "text-white/60" : ""}`}>
                    {service.description}
                  </p>
                </div>

                {/* Icon */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-[#c7ff35] group-hover:bg-[#c7ff35] group-hover:text-black ${activeServiceId === service.id ? "border-[#c7ff35] bg-[#c7ff35] text-black" : ""}`}>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Capabilities */}
              <div className={`grid overflow-hidden transition-all duration-500 ease-out group-hover:max-h-40 group-hover:pb-8 group-hover:opacity-100 md:pl-[120px] lg:pl-[100px] ${activeServiceId === service.id ? "max-h-40 pb-8 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className={`border border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/60 ${activeServiceId === service.id ? "border-white/20 text-white/60" : ""}`}
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2 md:items-end"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
              DESIGN / MOTION / VISUALS
            </p>
          </div>

          <p className="max-w-xl text-xl leading-relaxed text-white/50 md:ml-auto md:text-right md:text-2xl">
            One visual language. Multiple ways to make an idea impossible to
            ignore.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

