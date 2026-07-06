import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import { PillButton } from "./PillButton";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const visibleFeatures = project.features.slice(0, 4);

  if (project.placeholder) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex min-h-56 flex-col justify-between rounded-lg border border-ink/55 bg-cream/45 p-5 text-ink/72 shadow-soft"
      >
        <div>
          <div className="mb-6 flex items-center justify-between gap-3 text-xs font-bold uppercase text-ink/55">
            <span>{project.category}</span>
            <span>{project.status}</span>
          </div>
          <h3 className="font-serif text-2xl text-ink">{project.name}</h3>
          <p className="mt-3 text-sm leading-6">{project.description}</p>
        </div>
        <div className="mt-8 h-2 w-20 rounded-full bg-cover/70" />
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative overflow-hidden rounded-lg border border-ink bg-cream p-5 shadow-paper sm:p-7 lg:p-8"
    >
      <div className="absolute right-0 top-0 h-28 w-28 border-b border-l border-ink bg-page" aria-hidden="true" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-ink bg-page px-3 py-1 text-xs font-bold uppercase">
              {project.category}
            </span>
            <span className="rounded-full border border-greenAccent bg-greenAccent/12 px-3 py-1 text-xs font-bold uppercase text-ink">
              {project.status}
            </span>
          </div>
          <h3 className="font-serif text-4xl leading-tight sm:text-6xl">{project.name}</h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/78 sm:text-lg">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                className="rounded-full border border-ink/20 bg-white/45 px-3 py-1 text-xs font-semibold"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-ink bg-white/45 p-4">
          <h4 className="text-sm font-black uppercase">Destaques</h4>
          <ul className="mt-4 grid gap-2 text-sm text-ink/80 sm:grid-cols-2">
            {visibleFeatures.map((feature) => (
              <li className="flex items-center gap-2" key={feature}>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orangeAccent" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {project.url ? (
          <PillButton href={project.url} icon={<ArrowUpRight size={18} />}>
            Abrir projeto
          </PillButton>
        ) : null}
        <PillButton href="#contato" variant="outline" icon={<MessageCircle size={18} />}>
          Pedir algo parecido
        </PillButton>
      </div>
    </motion.article>
  );
}
