import ContentShowcase from "./ContentShowcase";
import ServiceCard from "../service/ServiceCard";
import { useRecentServices } from "../../hooks/useRecentServices";

const CARD_LIMIT = 3;

const ServiceGrid = () => {
  const { list, status, error } = useRecentServices(CARD_LIMIT);

  return (
    <ContentShowcase
      sectionClassName="bg-white"
      eyebrow="What We Do"
      title="Our Services"
      subtitle="From first requirement to live operations, we build, integrate and run digital
platforms for organisations where accountability is non-negotiable."
      list={list}
      status={status}
      errorMessage={
        error || "Something went wrong while loading services. Please refresh."
      }
      emptyMessage="No services available at the moment. Check back soon."
      renderCard={(s) => <ServiceCard service={s} showFeatures={false} />}
      cta={{ to: "/services", label: "View All Services" }}
    />
  );
};

export default ServiceGrid;
