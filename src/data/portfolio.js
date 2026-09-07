export const categories = [
  { id: "all", label: "ALL WORK" },
  { id: "branding", label: "BRANDING" },
  { id: "social-media", label: "SOCIAL MEDIA" },
  { id: "packaging", label: "PACKAGING" },
  { id: "advertising", label: "ADVERTISING" },
  { id: "editorial", label: "EDITORIAL" },
  { id: "print-design", label: "PRINT DESIGN" },
  { id: "restaurant", label: "RESTAURANT" },
];

const categoryLabels = {
  branding: "Branding",
  "social-media": "Social Media",
  packaging: "Packaging",
  advertising: "Advertising",
  editorial: "Editorial",
  "print-design": "Print Design",
  restaurant: "Restaurant Design",
};

const categoryContent = {
  branding: ["A considered identity system built around a clear mark, controlled typography and repeatable applications.", "The primary mark and restrained palette create a consistent visual language across the presented touchpoint.", ["Logo Design", "Brand Identity", "Visual Applications"], ["Brand Identity", "Logo Design", "Visual System"]],
  "social-media": ["A digital-first composition using strong hierarchy, accessible messaging and imagery designed for quick social scanning.", "Typography, image crops and graphic accents are balanced to keep the central message prominent.", ["Social Media Artwork", "Campaign Visual", "Art Direction"], ["Social Media", "Campaign", "Digital Design"]],
  packaging: ["Packaging-led design that connects a recognizable product identity with practical physical presentation.", "The structure, surface graphics and product-facing details work together as one coherent package system.", ["Packaging Design", "Product Mockup", "Print Artwork"], ["Packaging", "Product Design", "Print"]],
  advertising: ["A promotional visual direction shaped by a clear offer, a focused subject and high-contrast communication.", "Layered imagery, headline scale and supporting information guide attention from the proposition to the response point.", ["Campaign Visual", "Advertising Artwork", "Art Direction"], ["Advertising", "Campaign", "Visual Communication"]],
  editorial: ["An editorial composition balancing a strong cover statement with product imagery and a structured information hierarchy.", "Grid-led type, image cropping and contrast establish a premium magazine-like reading order.", ["Magazine Cover", "Editorial Layout", "Typography"], ["Editorial", "Typography", "Layout"]],
  "print-design": ["A print-focused composition where typography, whitespace and physical format carry the communication.", "Information is organized into clear zones while restrained graphic details support the main printed artifact.", ["Print Design", "Typography", "Layout Design"], ["Print Design", "Typography", "Composition"]],
  restaurant: ["A food-led promotional layout combining appetite appeal, menu information and a recognizable restaurant identity.", "Food photography anchors the page while color accents and structured columns make the offer easy to scan.", ["Menu Design", "Food Photography Direction", "Print Artwork"], ["Menu Design", "Food Promotion", "Print"]],
};

const makeProject = (id, title, category, image, description, options = {}) => {
  const [creativeDirection, designApproach, deliverables, tags] = categoryContent[category];
  return {
    id, title, category, categoryLabel: categoryLabels[category], image,
    size: options.size || "landscape", description, creativeDirection,
    designApproach, deliverables, tags,
    ...(options.gallery ? { gallery: options.gallery } : {}),
    ...(options.pdf ? { pdf: options.pdf } : {}),
    ...(options.pdfTitle ? { pdfTitle: options.pdfTitle } : {}),
    featured: options.featured ?? id <= 12,
  };
};

const projectSpecs = [
  ["Cibo Italiano Menu Booklet", "restaurant", "/images/restaurant/cibo-monday-lunch-menu.jpg", "Complete bilingual menu booklet design (Arabic & English) for CiBO Italiano restaurant, pairing food photography with refined editorial layout and structured offer hierarchy.", { size: "portrait", pdf: "/videos/Cibo Menu 2025.pdf", pdfTitle: "Cibo Italiano Menu Booklet (Arabic & English)", gallery: ["/images/restaurant/cibo-monday-lunch-menu.jpg", "/images/restaurant/cibo-wednesday-lunch-menu.jpg"] }],
  ["Trust Real Stationery", "branding", "/images/branding/trust-real-stationery.jpg", "A formal stationery presentation for Trust Real, using deep burgundy, cream stock and refined gold typography.", { size: "portrait" }],
  ["Quiet Certificate", "print-design", "/images/print-design/minimal-certificate.jpg", "A minimal certificate layout presented as a tactile print mockup with oversized vertical typography.", { size: "portrait" }],
  ["Appreciation Certificate", "print-design", "/images/print-design/certificate-of-appreciation.jpg", "A certificate of appreciation system shown through framed, folded and portrait applications.", { size: "portrait" }],
  ["Beauty Service Certificate", "print-design", "/images/print-design/beauty-service-certificate.jpg", "A restrained service certificate layout with generous space, fine rules and QR-enabled contact details.", { size: "portrait" }],
  ["Aura Velia", "advertising", "/images/advertising/aura-velia-fragrance.jpg", "A fragrance campaign introducing three Aura Velia scents through a warm, intimate product scene.", { size: "portrait" }],
  ["Gold Bacc", "advertising", "/images/advertising/gold-bacc-fragrance.jpg", "A product advertising composition for Gold Bacc fragrance, pairing the bottle with ingredient-led visual cues.", { size: "portrait" }],
  ["Prada Elegance", "advertising", "/images/advertising/prada-fashion-campaign.jpg", "A dark luxury fashion poster using bilingual typography, a patterned handbag and cinematic green lighting.", { size: "portrait" }],
  ["Aura Product Studies", "advertising", "/images/advertising/aura-fragrance-campaign.jpg", "A multi-panel fragrance image board exploring still-life, detail and interior product placements.", { size: "portrait" }],
  ["Explore The World", "advertising", "/images/advertising/flight-connect-travel.jpg", "A travel promotion combining destination photography, a phone-led social layout and a direct booking message.", { size: "portrait" }],
  ["Thailand Awaits", "advertising", "/images/advertising/thailand-travel-campaign.jpg", "A destination campaign for Thailand built around a scenic hero image, itinerary benefits and bold script lettering.", { size: "portrait" }],
  ["Maldives From Above", "advertising", "/images/advertising/maldives-travel-campaign.jpg", "A destination poster using an aerial island photograph and oversized hand-lettered travel messaging.", { size: "portrait" }],
  ["Travel Solutions", "advertising", "/images/advertising/walkthroughja-travel.jpg", "A travel booking poster using landmark imagery, a directional sign motif and a strong green call to action.", { size: "portrait" }],
  ["Timepieces", "editorial", "/images/editorial/timepieces-watch-magazine.jpg", "A luxury watch magazine cover built with deep green fabric, gold accents and a strong editorial grid.", { size: "portrait" }],
  ["Fine Diamond", "advertising", "/images/advertising/diamond-jewellery-campaign.jpg", "A jewellery campaign framing a diamond necklace and earrings against a warm sculptural display.", { size: "portrait" }],
  ["Lottilove Snack Box", "social-media", "/images/social-media/lottilove-snack-box.jpg", "A colorful children's snack-box presentation showing the package mockup and its unfolded print artwork.", { size: "portrait" }],
  ["Athien Forever", "packaging", "/images/packaging/athien-product-packaging.jpg", "A green-and-white fragrance package system shown as both a finished bottle-and-carton mockup and dieline.", { size: "portrait" }],
  ["Ravo Kafe", "branding", "/images/branding/ravo-kafe-identity.jpg", "A coffee identity board pairing a characterful wordmark with packaging, merchandise and cafe applications.", { size: "portrait" }],
  ["Apple Watch Series 10", "advertising", "/images/advertising/apple-watch-campaign.jpg", "A cool blue product advertisement using oversized type, lifestyle imagery and feature callouts.", { size: "portrait" }],
  ["Darn Naaz", "packaging", "/images/packaging/darn-naaz-shopping-bag.jpg", "A purple retail-bag identity shown with a finished mockup and production layout.", { size: "portrait" }],
  ["Soft Form", "social-media", "/images/social-media/hijab-fashion-campaign.jpg", "A fashion social composition presenting fabric texture, styling details and a soft neutral palette.", { size: "portrait" }],
  ["Tulia", "advertising", "/images/advertising/tulia-handbag-campaign.jpg", "A product detail campaign for a leather handbag, combining an oversized hero crop with feature close-ups.", { size: "portrait" }],
  ["Built In Confidence", "advertising", "/images/advertising/dwears-fashion-campaign.jpg", "A monochrome fashion poster balancing a confident editorial headline with a denim-led product scene.", { size: "portrait" }],
  ["Premium Residential Plots", "advertising", "/images/advertising/residential-plots-campaign.jpg", "A property campaign using an atmospheric aerial landscape, location marker and limited-offer hierarchy.", { size: "portrait" }],
  ["Urban Pin", "advertising", "/images/advertising/urban-pin-property.jpg", "A property promotion presenting a home, handover moment and service categories in a warm editorial layout.", { size: "portrait" }],
  ["Sky Views", "advertising", "/images/advertising/samana-sky-views.jpg", "A real-estate poster presenting a high-rise development with location, price and handover information.", { size: "portrait" }],
  ["Kokab-e-Zel", "social-media", "/images/social-media/kokab-e-zel-fashion.jpg", "A fashion collection board combining a styled portrait, garment details, fabric swatch and palette.", { size: "portrait" }],
  ["Passport In No Time", "advertising", "/images/advertising/passport-photo-service.jpg", "A service advertisement combining a camera, printed identity photos, bold type and contact information."],
  ["Elevate Your Workplace", "advertising", "/images/advertising/elevate-nameplate.jpg", "A product advertisement for customizable desk nameplates with feature-led callouts and workplace imagery."],
  ["Ramadan Mubarak", "social-media", "/images/social-media/ramadan-greeting.jpg", "A festive greeting composition using bilingual messaging, a lantern and a luminous night-sky scene.", { size: "portrait" }],
  ["Graduate Generations", "packaging", "/images/packaging/graduate-shopping-bag.jpg", "A branded shopping bag mockup using a bold wordmark, shoe-line pattern and red accent color."],
  ["Brewed Harmony", "branding", "/images/branding/brewed-harmony-tote.jpg", "A tactile tote-bag mockup centered on a friendly coffee-cup mark and expressive display lettering."],
  ["Revyn", "branding", "/images/branding/revyn-fashion-identity.jpg", "A monochrome fashion identity board applying a sharp symbol and wordmark across apparel and retail pieces."],
  ["Ajkeikino", "packaging", "/images/packaging/ajkeikino-shopping-bag.jpg", "A retail packaging mockup placing a playful two-tone wordmark against a vivid purple field."],
  ["Pragathi Oils", "advertising", "/images/advertising/pragathi-oils-campaign.jpg", "A product advertising board presenting a range of cooking oils with bright regional typography and pack imagery."],
  ["Kalyani Carnival", "advertising", "/images/advertising/kalyani-carnival-poster.jpg", "A high-energy event poster combining performers, bold lettering, collage and saturated yellow-purple color."],
  ["Saro Admissions", "advertising", "/images/advertising/saro-school-admission.jpg", "A school admission advertisement placed on a tuk-tuk mockup, using a bright academic message and expressive imagery."],
  ["Saudi Mandi Opening", "advertising", "/images/advertising/saudi-mandi-opening.jpg", "A restaurant opening poster using food photography, menu pricing and bilingual promotional typography.", { size: "portrait" }],
  ["Picnic Diwali", "advertising", "/images/advertising/picnic-diwali-campaign.jpg", "A festive sweets campaign pairing product photography with a Diwali celebration message and price menu."],
];

export const portfolioProjects = projectSpecs.map(([title, category, image, description, options], index) =>
  makeProject(index + 1, title, category, image, description, options),
);
