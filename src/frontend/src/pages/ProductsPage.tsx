import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { motion } from "motion/react";

const STANDARDS = [
  "IS 2016",
  "IS 6649",
  "IS 6916",
  "IS 5372",
  "IS 5374",
  "ISO 7089",
  "ISO 7090",
  "ISO 7091",
  "DIN 125",
  "EN 14399-1",
  "EN 14399-2",
  "EN 14399-3",
  "EN 14399-4",
  "EN 14399-5",
  "EN 14399-6",
  "F436",
];

const PRODUCT_GROUPS = [
  {
    title: "Taper Washers for Channels (IS 5372)",
    image: "/assets/generated/taper-washers.dim_600x400.jpg",
    variants: ["MS (Mild Steel)", "EN8", "SS (Stainless Steel)"],
    description:
      "Manufactured as per IS 5372, these taper washers are designed for use with Indian Standard Medium-weight Channels (ISMC). The taper compensates for the slope of the channel flange, ensuring full bearing contact under bolt heads and nuts.",
    standards: ["IS 5372"],
    topColor: "oklch(0.72 0.14 65)",
    badgeBg: "oklch(0.72 0.14 65 / 0.12)",
    badgeColor: "oklch(0.72 0.14 65)",
  },
  {
    title: "Taper Washers for I-Sections (IS 6649)",
    image: "/assets/generated/taper-washers.dim_600x400.jpg",
    variants: ["MS (Mild Steel)", "EN8", "SS (Stainless Steel)"],
    description:
      "Manufactured as per IS 6649, these taper washers are designed for use with Indian Standard Medium-weight Beams (ISMB/I-sections). The tapered profile accommodates the flange slope of I-beams for flush, reliable fastener seating.",
    standards: ["IS 6649"],
    topColor: "oklch(0.72 0.14 65)",
    badgeBg: "oklch(0.72 0.14 65 / 0.12)",
    badgeColor: "oklch(0.72 0.14 65)",
  },
  {
    title: "Round Washers",
    image: "/assets/generated/round-washers.dim_600x400.jpg",
    variants: [
      "MS (Mild Steel)",
      "C45 Carbon Steel",
      "SS (Stainless Steel)",
      "Brass",
      "PB (Phosphor Bronze)",
    ],
    description:
      "Standard round flat washers for distributing load of a threaded fastener. Available in a wide range of diameters and thicknesses to suit all industrial applications.",
    standards: [
      "IS 2016",
      "IS 6649",
      "ISO 7089",
      "ISO 7090",
      "ISO 7091",
      "DIN 125",
    ],
    topColor: "oklch(0.52 0.15 230)",
    badgeBg: "oklch(0.52 0.15 230 / 0.12)",
    badgeColor: "oklch(0.65 0.1 230)",
  },
  {
    title: "Rectangular Washers",
    image: "/assets/generated/rectangular-washers.dim_600x400.jpg",
    variants: ["MS (Mild Steel)", "SS (Stainless Steel)"],
    description:
      "Rectangular flat washers provide larger surface contact for slotted holes and heavy-duty structural bolting applications where standard round washers are insufficient.",
    standards: ["IS 6916", "EN 14399-5"],
    topColor: "oklch(0.58 0.12 200)",
    badgeBg: "oklch(0.58 0.12 200 / 0.12)",
    badgeColor: "oklch(0.68 0.1 200)",
  },
  {
    title: "Square Washers",
    image: "/assets/generated/square-washers.dim_600x400.jpg",
    variants: ["MS (Mild Steel)", "SS (Stainless Steel)"],
    description:
      "Square plate washers are used in timber construction, agricultural equipment, and structural steelwork for wide load distribution and anti-rotation purposes.",
    standards: ["IS 6916", "F436"],
    topColor: "oklch(0.58 0.12 200)",
    badgeBg: "oklch(0.58 0.12 200 / 0.12)",
    badgeColor: "oklch(0.68 0.1 200)",
  },
  {
    title: "Stainless Steel Round Flat Washers",
    image: "/assets/generated/ss-round-washers.dim_600x400.jpg",
    variants: ["SS 304", "SS 316", "2 mm", "3 mm"],
    description:
      "High-grade stainless steel washers offering excellent corrosion resistance for marine, chemical, and food-grade industrial environments.",
    standards: ["IS 2016", "DIN 125", "ISO 7089"],
    topColor: "oklch(0.72 0.06 220)",
    badgeBg: "oklch(0.72 0.06 220 / 0.12)",
    badgeColor: "oklch(0.72 0.06 220)",
  },
  {
    title: "Galvanized Iron & Plain Metal Washers",
    image: "/assets/generated/gi-plain-washers.dim_600x400.jpg",
    variants: ["GI (Galvanized Iron) 1.5 mm", "Plain Metal – Various"],
    description:
      "Zinc-coated galvanized washers for outdoor and structural use, plus uncoated plain metal washers in multiple sizes for general engineering.",
    standards: ["IS 2016", "IS 6649"],
    topColor: "oklch(0.68 0.12 85)",
    badgeBg: "oklch(0.68 0.12 85 / 0.12)",
    badgeColor: "oklch(0.72 0.14 65)",
  },
];

function ProductCard({
  group,
  index,
}: { group: (typeof PRODUCT_GROUPS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      data-ocid={`products.item.${index + 1}`}
    >
      <Card
        className="h-full overflow-hidden transition-all duration-300 group hover:-translate-y-1"
        style={{
          background: "oklch(0.15 0.022 232)",
          border: "1px solid oklch(0.24 0.03 232)",
          borderTop: `3px solid ${group.topColor}`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 40px oklch(0.1 0.015 232 / 0.6), 0 0 0 1px oklch(0.72 0.14 65 / 0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "";
        }}
      >
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <img
            src={group.image}
            alt={group.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.1 0.015 232 / 0.85) 0%, transparent 60%)",
            }}
          />
        </div>
        <CardHeader className="pb-2 pt-4">
          <CardTitle
            className="font-heading text-base leading-snug"
            style={{ color: "oklch(0.92 0.01 232)" }}
          >
            {group.title}
          </CardTitle>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {group.variants.map((v) => (
              <span
                key={v}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: group.badgeBg,
                  color: group.badgeColor,
                  border: `1px solid ${group.badgeColor.replace(")", " / 0.35)")}`,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.52 0.025 232)" }}
          >
            {group.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {group.standards.map((s) => (
              <span
                key={s}
                className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{
                  background: "oklch(0.19 0.025 232)",
                  border: "1px solid oklch(0.28 0.04 232)",
                  color: "oklch(0.58 0.04 232)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProductsPage() {
  return (
    <div>
      {/* Page hero banner */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ background: "oklch(0.1 0.015 232)", minHeight: "300px" }}
      >
        <div className="absolute inset-0 hero-grid-pattern opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, oklch(0.42 0.16 230 / 0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center h-full pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              ✦ Full Product Range
            </p>
            <h1
              className="font-heading text-5xl md:text-6xl font-bold mb-4"
              style={{ color: "oklch(0.94 0.01 232)" }}
            >
              Our <span className="text-gold-shimmer">Products</span>
            </h1>
            <p
              className="text-base max-w-xl"
              style={{ color: "oklch(0.6 0.025 232)" }}
            >
              Precision-manufactured washers in stainless steel, mild steel,
              galvanized iron, carbon steel, brass, and phosphor bronze —
              available as per all major industrial standards.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-12" style={{ background: "oklch(0.12 0.018 232)" }}>
        <div className="container mx-auto px-4">
          {/* Standards Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 rounded-xl px-6 py-5"
            style={{
              background: "oklch(0.14 0.022 232)",
              border: "1px solid oklch(0.24 0.03 232)",
              borderTop: "2px solid oklch(0.72 0.14 65 / 0.6)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.18em] mb-4"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              Standards We Manufacture To
            </p>
            <div className="flex flex-wrap gap-2">
              {STANDARDS.map((s) => (
                <span
                  key={s}
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.42 0.16 230 / 0.12)",
                    border: "1px solid oklch(0.42 0.16 230 / 0.3)",
                    color: "oklch(0.65 0.1 230)",
                    boxShadow: "0 0 8px oklch(0.42 0.16 230 / 0.1)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_GROUPS.map((g, i) => (
              <ProductCard key={g.title} group={g} index={i} />
            ))}
          </div>

          {/* Additional products note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 rounded-xl border-2 border-dashed py-8 px-6 text-center"
            style={{ borderColor: "oklch(0.28 0.04 232)" }}
          >
            <Package
              className="w-10 h-10 mx-auto mb-3"
              style={{ color: "oklch(0.72 0.14 65)" }}
            />
            <p
              className="font-heading text-lg font-bold mb-1"
              style={{ color: "oklch(0.85 0.01 232)" }}
            >
              Many More Types Available
            </p>
            <p className="text-sm" style={{ color: "oklch(0.52 0.025 232)" }}>
              We manufacture washers as per customer drawings and
              specifications. Contact us for custom sizes, materials, and
              special standards.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Request a Quote CTA section */}
      <section
        className="py-20"
        style={{
          background: "oklch(0.14 0.022 232)",
          borderTop: "1px solid oklch(0.22 0.03 232)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "oklch(0.72 0.14 65)" }}
              >
                Bulk Orders Welcome
              </p>
              <h2
                className="font-heading text-4xl font-bold mb-4"
                style={{ color: "oklch(0.93 0.01 232)" }}
              >
                Request a{" "}
                <span style={{ color: "oklch(0.72 0.14 65)" }}>Quote</span>
              </h2>
              <p
                className="text-base mb-8"
                style={{ color: "oklch(0.55 0.025 232)" }}
              >
                Need custom sizes, special materials, or bulk pricing? We
                respond within 24 hours with a detailed quotation.
              </p>
              <Button
                asChild
                size="lg"
                data-ocid="products.primary_button"
                className="font-semibold"
                style={{
                  background: "oklch(0.72 0.14 65)",
                  color: "oklch(0.12 0.02 65)",
                  boxShadow: "0 4px 24px oklch(0.72 0.14 65 / 0.3)",
                  border: "none",
                }}
              >
                <Link to="/contact">
                  Contact Us for Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
