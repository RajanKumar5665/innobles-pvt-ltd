// -----------------------------------------------------------------------------
// Single source of truth for product categories.
// Used together by: the Products page filter, the footer links, the admin
// panel (filter + product form) and the backend category migration/validation.
// -----------------------------------------------------------------------------

// `id`  -> short URL-friendly key (used in links: /products?category=<id>)
// `label` -> human-facing category name (stored ON the product)
// `items` -> known product names under this category (used to map existing
//            products to the right category in migration + admin "quick set")
export const PRODUCT_CATEGORIES = [
  {
    id: "collections",
    label: "Collections",
    items: [
      "Property Tax Management",
      "Electricity Bill Management",
      "Water Bill Management",
      "Waste Collection Management",
      "e-Rent / Lease Collection",
    ],
  },
  {
    id: "disbursements",
    label: "Disbursements",
    items: [
      "Fund Disbursement Management",
      "e-Rent Disbursement",
      "EV Subsidy Disbursement",
      "Roadside Accident Claim Management",
      "Land Acquisition & Purchase",
      "Deed Generation Management",
      "Direct Benefit Transfer (DBT)",
    ],
  },
  {
    id: "treasury-finance",
    label: "Treasury & Finance",
    items: [
      "Finance Management (Income & Expenditure)",
      "Budget Tracking",
      "Project Surveillance & Monitoring",
    ],
  },
  {
    id: "bank-instruments",
    label: "Bank Instruments",
    items: [
      "Bank Guarantee Management (Physical)",
      "Electronic Bank Guarantee (eBG)",
    ],
  },
  {
    id: "procurement",
    label: "Procurement",
    items: ["e-Tender", "e-Auction", "e-Lottery"],
  },
  {
    id: "governance-citizen-services",
    label: "Governance & Citizen Services",
    items: [
      "Grievance Management",
      "e-Appointment Booking",
      "DAK & Document Management",
      "Legal Case Management",
    ],
  },
  {
    id: "sector-solutions",
    label: "Sector Solutions",
    items: [
      "Hotel Booking & Management",
      "Ticket Management",
      "Parking Management",
      "Advertisement Rental / Lease",
      "Temple Management",
      "Society Management",
      "Club Membership Management",
      "Health Assist",
    ],
  },
  {
    id: "workforce-operations",
    label: "Workforce & Operations",
    items: [
      "Payroll & HRMS",
      "Inventory Management",
      "Installation & After-Sales Service",
      "Online Quiz & Assessment",
      "Prefect (School Management)",
    ],
  },
];

// Just the category labels (used by the admin dropdown and product form).
export const PRODUCT_CATEGORY_LABELS = PRODUCT_CATEGORIES.map((c) => c.label);

// Find a category by its id; returns null if unknown.
export const getCategoryById = (id) =>
  PRODUCT_CATEGORIES.find((c) => c.id === id) || null;

// Look up a category by its label; returns null if unknown.
export const getCategoryByLabel = (label) =>
  PRODUCT_CATEGORIES.find(
    (c) => c.label.toLowerCase() === String(label || "").trim().toLowerCase(),
  ) || null;
