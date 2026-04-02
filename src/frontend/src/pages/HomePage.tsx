import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Package, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const FEATURED_MATERIALS = [
  {
    material: "Stainless Steel",
    label: "Stainless Steel",
    topColor: "oklch(0.65 0.04 230)",
    desc: "Corrosion resistant, ideal for marine and food-grade applications.",
  },
  {
    material: "Mild Steel",
    label: "Mild Steel",
    topColor: "oklch(0.52 0.06 230)",
    desc: "Cost-effective and versatile for general engineering use.",
  },
  {
    material: "Galvanized Iron",
    label: "Galvanized Iron",
    topColor: "oklch(0.72 0.14 65)",
    desc: "Zinc-coated for enhanced corrosion resistance outdoors.",
  },
];

const PRODUCT_IMAGES: Record<string, string> = {
  "Stainless Steel": "/assets/generated/product-ss-washer.dim_400x400.jpg",
  "Mild Steel": "/assets/generated/product-ms-washer.dim_400x400.jpg",
  "Galvanized Iron": "/assets/generated/product-gi-washer.dim_400x400.jpg",
};

const STATS = [
  { label: "Products", value: "10+", icon: Package },
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "Happy Clients", value: "500+", icon: Shield },
  { label: "Daily Output", value: "50K+", icon: Zap },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[680px] flex items-center overflow-hidden"
        style={{ background: "oklch(0.1 0.015 232)" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-washers.dim_1600x600.jpg')",
          }}
        />
        {/* Geometric grid overlay */}
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        {/* Gradient vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.1 0.015 232 / 0.95) 0%, oklch(0.14 0.025 232 / 0.75) 60%, oklch(0.1 0.015 232 / 0.9) 100%)",
          }}
        />
        {/* Gold accent glow top-right */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{
            background:
              "radial-gradient(ellipse at 80% 30%, oklch(0.72 0.14 65 / 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Badge
              className="mb-6 text-[10px] tracking-[0.2em] uppercase font-bold"
              style={{
                background: "oklch(0.72 0.14 65 / 0.12)",
                color: "oklch(0.72 0.14 65)",
                border: "1px solid oklch(0.72 0.14 65 / 0.35)",
              }}
            >
              ✦ Precision Metal Washers
            </Badge>
            <h1
              className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
              style={{ color: "oklch(0.95 0.01 232)" }}
            >
              Industrial <span className="text-gold-shimmer">Washers,</span>
              <br />
              Engineered
              <br />
              to Last.
            </h1>
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
              style={{ color: "oklch(0.65 0.025 232)" }}
            >
              Clyclem Engg Works manufactures premium-grade washers — stainless
              steel, mild steel, and galvanized iron — built to exacting
              tolerances for every industrial application.
            </p>

            {/* Inline mini-stats ribbon */}
            <div
              className="flex flex-wrap gap-6 mb-10 py-4 border-y"
              style={{ borderColor: "oklch(0.28 0.04 232)" }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span
                    className="font-heading font-bold text-2xl"
                    style={{ color: "oklch(0.72 0.14 65)" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{ color: "oklch(0.52 0.03 232)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                data-ocid="home.primary_button"
                className="font-semibold"
                style={{
                  background: "oklch(0.72 0.14 65)",
                  color: "oklch(0.12 0.02 65)",
                  boxShadow: "0 4px 24px oklch(0.72 0.14 65 / 0.35)",
                  border: "none",
                }}
              >
                <Link to="/products">
                  Explore Products <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                data-ocid="home.secondary_button"
                className="font-medium backdrop-blur-sm"
                style={{
                  background: "oklch(0.18 0.025 232 / 0.6)",
                  border: "1px solid oklch(0.42 0.16 230 / 0.4)",
                  color: "oklch(0.78 0.06 232)",
                }}
              >
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        style={{
          background: "oklch(0.14 0.022 232)",
          borderTop: "1px solid oklch(0.72 0.14 65 / 0.15)",
          borderBottom: "1px solid oklch(0.22 0.03 232)",
        }}
      >
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="text-center px-4 py-4 relative"
                style={{
                  borderRight:
                    i < STATS.length - 1
                      ? "1px solid oklch(0.24 0.03 232)"
                      : undefined,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{
                    background: "oklch(0.18 0.025 232)",
                    border: "1px solid oklch(0.72 0.14 65 / 0.25)",
                  }}
                >
                  <s.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.72 0.14 65)" }}
                  />
                </div>
                <div
                  className="font-heading text-4xl font-bold mb-1"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.14 65), oklch(0.85 0.1 75))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "oklch(0.52 0.03 232)" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Types */}
      <section
        className="py-20"
        style={{ background: "oklch(0.12 0.018 232)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              Material Families
            </p>
            <h2
              className="font-heading text-4xl md:text-5xl font-bold"
              style={{ color: "oklch(0.93 0.01 232)" }}
            >
              Built from the{" "}
              <span style={{ color: "oklch(0.72 0.14 65)" }}>
                finest metals
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_MATERIALS.map((m, i) => (
              <motion.div
                key={m.material}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <Card
                  className="overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "oklch(0.15 0.022 232)",
                    border: "1px solid oklch(0.24 0.03 232)",
                    borderTop: `3px solid ${m.topColor}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 40px oklch(0.12 0.018 232 / 0.6), 0 0 0 1px oklch(0.72 0.14 65 / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={PRODUCT_IMAGES[m.material]}
                      alt={m.material}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(0.1 0.015 232 / 0.9) 0%, oklch(0.1 0.015 232 / 0.3) 50%, transparent 100%)",
                      }}
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: m.topColor }}
                      />
                      <h3
                        className="font-heading font-bold text-base"
                        style={{ color: "oklch(0.92 0.01 232)" }}
                      >
                        {m.material} Washers
                      </h3>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.55 0.03 232)" }}
                    >
                      {m.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Button
              asChild
              data-ocid="home.primary_button"
              variant="outline"
              className="font-medium"
              style={{
                borderColor: "oklch(0.42 0.16 230 / 0.4)",
                color: "oklch(0.65 0.05 230)",
                background: "transparent",
              }}
            >
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section
        className="py-20"
        style={{
          background: "oklch(0.14 0.022 232)",
          borderTop: "1px solid oklch(0.22 0.03 232)",
          borderBottom: "1px solid oklch(0.22 0.03 232)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              About Us
            </p>
            <h2
              className="font-heading text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "oklch(0.93 0.01 232)" }}
            >
              15+ years of precision
              <br />
              <span style={{ color: "oklch(0.72 0.14 65)" }}>
                manufacturing
              </span>
            </h2>
            <p
              className="text-base leading-relaxed max-w-2xl"
              style={{ color: "oklch(0.6 0.025 232)" }}
            >
              Established over 15 years ago, Clyclem Engg Works has grown to
              become one of India's trusted manufacturers of high-precision
              metal washers. Our state-of-the-art manufacturing facility is
              equipped with advanced stamping and finishing machinery, enabling
              us to produce washers to DIN, ISO, and IS standards across all
              sizes and materials.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "ISO 9001:2015 Certified",
                "DIN Standards",
                "Pan-India Delivery",
              ].map((cert) => (
                <div
                  key={cert}
                  className="text-sm font-medium px-4 py-2 rounded"
                  style={{
                    background: "oklch(0.18 0.025 232)",
                    border: "1px solid oklch(0.72 0.14 65 / 0.25)",
                    color: "oklch(0.72 0.14 65)",
                  }}
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: "oklch(0.1 0.015 232)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              Ready to Order?
            </p>
            <h2
              className="font-heading text-4xl md:text-5xl font-bold mb-5"
              style={{ color: "oklch(0.93 0.01 232)" }}
            >
              Let's build something{" "}
              <span style={{ color: "oklch(0.72 0.14 65)" }}>together</span>
            </h2>
            <p
              className="mb-10 text-base"
              style={{ color: "oklch(0.55 0.025 232)" }}
            >
              Contact us today for bulk pricing, custom sizes, and quick
              delivery across India.
            </p>
            <Button
              asChild
              size="lg"
              data-ocid="home.primary_button"
              className="font-semibold text-base px-8"
              style={{
                background: "oklch(0.72 0.14 65)",
                color: "oklch(0.12 0.02 65)",
                boxShadow: "0 4px 32px oklch(0.72 0.14 65 / 0.3)",
                border: "none",
              }}
            >
              <Link to="/contact">
                Contact Us <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
