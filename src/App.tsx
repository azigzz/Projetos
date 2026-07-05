import { BookIntroSection } from "./components/BookIntroSection";
import { ContactFooter } from "./components/ContactFooter";
import { ProcessSection } from "./components/ProcessSection";
import { ProjectsSection } from "./components/ProjectsSection";

export default function App() {
  return (
    <main className="min-h-screen bg-page text-ink">
      <BookIntroSection />
      <ProjectsSection />
      <ProcessSection />
      <ContactFooter />
    </main>
  );
}
