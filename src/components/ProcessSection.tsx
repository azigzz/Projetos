import { motion } from "framer-motion";

const steps = [
  {
    title: "Ideia",
    text: "Entender o que precisa existir e o que pode ficar simples.",
  },
  {
    title: "Interface",
    text: "Transformar a ideia em uma tela bonita e clara.",
  },
  {
    title: "Site",
    text: "Construir uma experiência rápida, responsiva e fácil de usar.",
  },
  {
    title: "Entrega",
    text: "Colocar online com um link pronto para qualquer pessoa acessar.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-page px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase text-cover">Como trabalho</p>
          <h2 className="mt-2 font-serif text-4xl leading-tight sm:text-6xl">
            Ideia clara, visual bonito, uso simples e link online para qualquer pessoa acessar.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-lg border border-ink bg-cream/80 p-5 shadow-soft"
              key={step.title}
            >
              <span className="font-serif text-4xl text-cover">0{index + 1}</span>
              <h3 className="mt-8 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/72">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
