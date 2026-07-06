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
  {
    name: "VeloForge",
    url: "https://veloforge.netlify.app/",
    category: "Site institucional",
    status: "Online",
    description:
      "Site de apresentação para uma empresa do setor de motores, com foco em presença online, visual marcante e leitura simples.",
    features: [
      "Landing page institucional",
      "Design responsivo",
      "Tema automotivo premium",
      "Animações suaves de scroll",
      "Hero com vídeo",
      "Seção interativa de motor",
      "Cards 3D com hover",
      "Seção de serviços",
      "CTA de contato",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Three.js", "Lenis", "Vercel"],
  },
];
