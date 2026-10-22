import ContactSection from "../components/home/ContactSection";

export const metadata = {
  title: "Contact | Chen Sreyneat",
  description: "Get in touch with Chen Sreyneat for collaborations, projects, or inquiries."
};

export default function Contact() {
  return (
    <main className="max-w-6xl mx-auto px-0 sm:px-4 pt-6 pb-16">
      <ContactSection />
    </main>
  );
}
