import ContentShowcase from "./ContentShowcase";
import ServiceCard from "../service/ServiceCard";
import { useRecentServices } from "../../hooks/useRecentServices";

const CARD_LIMIT = 3;

/**
 * Public-facing "Services" highlight on the homepage.
 *
 * Cards come from the existing /services API (same data managed in the
 * Admin panel) sorted newest-first and limited to 3 so the grid matches the
 * Products and Blog previews. Reuses the shared `ContentShowcase` shell
 * (centered header + staggered 3-column grid + consistent CTA) and the existing
 * public ServiceCard component. "View All Services" navigates to the existing
 * Services listing page (/services). No service system is duplicated.
 */
const ServiceGrid = () => {
  const { list, status, error } = useRecentServices(CARD_LIMIT);

  return (
    <ContentShowcase
      sectionClassName="bg-white"
      eyebrow="What We Do"
      title="Our Services"
      subtitle="From strategy to implementation, we deliver reliable digital solutions that help businesses grow, scale, and stay ahead."
      list={list}
      status={status}
      errorMessage={error || "Something went wrong while loading services. Please refresh."}
      emptyMessage="No services available at the moment. Check back soon."
      renderCard={(s) => <ServiceCard service={s} showFeatures={false} />}
      cta={{ to: "/services", label: "View All Services" }}
    />
  );
};

export default ServiceGrid;