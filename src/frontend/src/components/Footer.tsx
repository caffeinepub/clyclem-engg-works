import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      style={{
        background: "oklch(0.1 0.015 232)",
      }}
    >
      {/* Gradient top border */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, oklch(0.42 0.16 230), oklch(0.72 0.14 65), oklch(0.42 0.16 230))",
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-lg shrink-0"
                style={{
                  background: "oklch(0.16 0.022 232)",
                  border: "1.5px solid oklch(0.72 0.14 65 / 0.6)",
                  color: "oklch(0.72 0.14 65)",
                }}
              >
                C
              </div>
              <div>
                <div
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.93 0.01 232)" }}
                >
                  Clyclem Engg Works
                </div>
                <div
                  className="text-[10px] tracking-widest uppercase"
                  style={{ color: "oklch(0.72 0.14 65)" }}
                >
                  Precision Metal Manufacturers
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "oklch(0.52 0.03 232)" }}
            >
              Precision-manufactured metal washers trusted by industries across
              India. Quality assured, delivery focused.
            </p>
            {/* Certification badges */}
            <div className="flex flex-wrap gap-2">
              {["ISO 9001", "DIN", "IS Standards"].map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded tracking-wide uppercase"
                  style={{
                    background: "oklch(0.18 0.025 232)",
                    border: "1px solid oklch(0.72 0.14 65 / 0.3)",
                    color: "oklch(0.72 0.14 65)",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-heading font-bold text-xs uppercase tracking-widest mb-5"
              style={{
                color: "oklch(0.72 0.14 65)",
                borderBottom: "1px solid oklch(0.72 0.14 65 / 0.2)",
                paddingBottom: "0.5rem",
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Products", to: "/products" },
                { label: "Videos", to: "/videos" },
                { label: "Downloads", to: "/downloads" },
                { label: "Contact Us", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm transition-opacity hover:opacity-80 flex items-center gap-2"
                    style={{ color: "oklch(0.65 0.025 232)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: "oklch(0.72 0.14 65 / 0.6)" }}
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-heading font-bold text-xs uppercase tracking-widest mb-5"
              style={{
                color: "oklch(0.72 0.14 65)",
                borderBottom: "1px solid oklch(0.72 0.14 65 / 0.2)",
                paddingBottom: "0.5rem",
              }}
            >
              Contact
            </h3>
            <ul
              className="space-y-3 text-sm"
              style={{ color: "oklch(0.62 0.025 232)" }}
            >
              <li className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.72 0.14 65)" }}
                />
                121/2, Stella Smruti House, Nalai Wadi, Saloli, Vasai West,
                Vasai Virar, Palghar, Maharashtra 401201
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.72 0.14 65)" }}
                />
                +91 96651 67630 / +91 93220 76462
              </li>
              <li className="flex items-center gap-2">
                <Mail
                  className="w-4 h-4 shrink-0"
                  style={{ color: "oklch(0.72 0.14 65)" }}
                />
                clyclemengineering@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t text-center text-xs"
          style={{
            borderColor: "oklch(0.22 0.025 232)",
            color: "oklch(0.42 0.025 232)",
          }}
        >
          © {year} Clyclem Engg Works. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
