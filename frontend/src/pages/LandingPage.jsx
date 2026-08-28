import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Manifesto } from "@/components/Manifesto";
import { Simulator } from "@/components/Simulator";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { LogoStrip } from "@/components/LogoStrip";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function LandingPage() {
  const [agendaOpen, setAgendaOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  const openAgenda = () => setAgendaOpen(true);

  return (
    <div data-testid="landing-page">
      <Header onAgenda={openAgenda} transparentTop />
      <main>
        <Hero onAgenda={openAgenda} />
        <WhatsAppFloat />
        <LogoStrip />
        <Marquee />
        <Manifesto />
        <Simulator onAgenda={openAgenda} />
        <ServicesGrid />
        <Testimonials />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <AppointmentDialog open={agendaOpen} onOpenChange={setAgendaOpen} />
    </div>
  );
}
