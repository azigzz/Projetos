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
    name: "VeloForge",
    url: "https://veloforge.netlify.app/",
    category: "Site institucional",
    status: "Online",
    description:
      "Landing page premium para uma empresa do setor automotivo, com visual forte e interação em 3D.",
    features: [
      "Tema automotivo premium",
      "Hero com vídeo",
      "Seção interativa de motor",
      "Cards 3D com hover",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Three.js", "Lenis", "Vercel"],
    featured: true,
  },
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
  },
];
