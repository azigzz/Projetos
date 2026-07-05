export type Project = {
  name: string;
  url?: string;
  category: string;
  status: string;
  description: string;
  features: string[];
  tech: string[];
  featured?: boolean;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    name: "StudyFlow",
    url: "https://sstudyflow.netlify.app/",
    category: "Web App",
    status: "Online",
    description:
      "Dashboard de cursos para organizar estudos, planejar a semana, usar timer e acompanhar progresso.",
    features: [
      "Cadastro de cursos",
      "Planejamento semanal",
      "Timer de estudos",
      "Histórico",
      "Estatísticas",
      "Animação com scroll",
    ],
    tech: ["React", "Vite", "TypeScript", "Tailwind", "Framer Motion"],
    featured: true,
  },
];
