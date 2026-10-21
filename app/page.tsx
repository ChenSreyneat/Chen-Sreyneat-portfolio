import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import EducationSection from "./components/home/EducationSection";
import ExperienceSection from "./components/home/ExperienceSection";
import ProjectsSection from "./components/home/ProjectsSection";
import CertificatesSection from "./components/home/CertificatesSection";
import ContactSection from "./components/home/ContactSection";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto">
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
    </main>
  );
}
