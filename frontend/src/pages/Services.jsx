import Seo from "../components/seo/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Loader from "../components/common/Loader";
import StaggerGroup, { StaggerItem } from "../components/common/StaggerGroup";
import ServiceCard from "../components/service/ServiceCard";
import ContactSection from "../components/Home/ContactSection";
import { useServices } from "../hooks/useServices";

const Services = () => {
  const { list, status } = useServices();

  return (
    <>
      <Seo
        title="Services"
        description="Web development, mobile apps, cloud & DevOps, AI/automation, UI/UX design and IT consulting from Innobles."
        path="/services"
      />

      <PageHero
        eyebrow="Our Services"
        title="Everything you need to"
        highlight="ship & scale"
        afterHighlight="software"
        description="Six capabilities, one accountable team. Pick one service or let us run the full lifecycle from requirement gathering to live operations."
      />

      {/* Detailed services */}
      <section className="container-x py-20">
        <SectionHeading 
        // eyebrow="Capabilities"
         title="What we deliver" />

        {status === "loading" && <div className="mt-12"><Loader className="!h-32" size="lg" /></div>}

        {status === "success" && (
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <StaggerItem key={s.id} className="h-full">
                <ServiceCard service={s} showFeatures={true} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        {status === "error" && (
          <div className="mt-12 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
            Something went wrong while loading services. Please refresh.
          </div>
        )}
      </section>

      {/* <CTA /> */}
      <ContactSection />
    </>
  );
};

export default Services;