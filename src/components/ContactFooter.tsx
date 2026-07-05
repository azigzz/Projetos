import { ArrowUpRight, Github, Instagram, Mail } from "lucide-react";
import { PillButton } from "./PillButton";

export function ContactFooter() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-cover px-5 py-16 text-cream sm:px-8 sm:py-24">
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase text-cream/70">Contato</p>
          <h2 className="mt-3 font-serif text-5xl leading-tight sm:text-7xl">
            Quer um site assim?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/82">
            Me chama e eu te mostro uma ideia simples para seu projeto.
          </p>
        </div>

        <div className="rounded-lg border border-cream/35 bg-black/12 p-5 backdrop-blur">
          <div className="grid gap-3 sm:grid-cols-2">
            <PillButton href="https://github.com/azigzz" variant="paper" icon={<Github size={18} />}>
              GitHub
            </PillButton>
            <PillButton href="mailto:saviopvd@gmail.com" variant="paper" icon={<Mail size={18} />}>
              Enviar email
            </PillButton>
            <PillButton href="https://instagram.com/zsavio_" variant="paper" icon={<Instagram size={18} />}>
              Instagram
            </PillButton>
            <PillButton href="https://sstudyflow.netlify.app/" variant="paper" icon={<ArrowUpRight size={18} />}>
              Ver StudyFlow
            </PillButton>
          </div>

          <div className="mt-6 space-y-2 text-sm text-cream/74">
            <p>github.com/azigzz</p>
            <p>saviopvd@gmail.com</p>
            <p>instagram.com/zsavio_</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
