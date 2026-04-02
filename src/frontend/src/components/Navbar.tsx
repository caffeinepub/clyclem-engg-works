import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Videos", to: "/videos" },
  { label: "Downloads", to: "/downloads" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const qc = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      qc.clear();
    } else {
      try {
        await login();
      } catch (e: any) {
        if (e?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-sm navbar-shimmer-border"
      style={{
        background: "oklch(0.13 0.02 232 / 0.97)",
        borderBottom: "1px solid oklch(0.72 0.14 65 / 0.2)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          data-ocid="nav.link"
        >
          {/* Stylized lettermark */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-lg shrink-0"
            style={{
              background: "oklch(0.16 0.022 232)",
              border: "1.5px solid oklch(0.72 0.14 65 / 0.7)",
              color: "oklch(0.72 0.14 65)",
              boxShadow: "0 0 12px oklch(0.72 0.14 65 / 0.2)",
            }}
          >
            C
          </div>
          <div className="leading-tight">
            <div
              className="font-heading font-bold text-base tracking-tight"
              style={{ color: "oklch(0.94 0.01 232)" }}
            >
              Clyclem
            </div>
            <div
              className="text-[10px] font-medium tracking-widest uppercase"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              Engg Works
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              className="relative px-3 py-2 text-sm font-medium rounded transition-colors group"
              style={{ color: "oklch(0.72 0.03 232)" }}
              activeProps={{
                className:
                  "relative px-3 py-2 text-sm font-medium rounded transition-colors group",
                style: { color: "oklch(0.94 0.01 232)", fontWeight: 600 },
              }}
            >
              {link.label}
              {/* Gold active dot indicator - shown via activeProps via parent, workaround: always render, use activeProps to toggle */}
            </Link>
          ))}
          <Link
            to="/admin"
            data-ocid="nav.link"
            className="px-3 py-2 text-sm font-medium rounded transition-colors"
            style={{ color: "oklch(0.72 0.03 232)" }}
            activeProps={{
              style: { color: "oklch(0.94 0.01 232)", fontWeight: 600 },
            }}
          >
            Admin
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Get a Quote CTA — desktop only */}
          <Link
            to="/contact"
            className="hidden md:block"
            data-ocid="nav.primary_button"
          >
            <Button
              size="sm"
              className="text-xs font-semibold tracking-wide"
              style={{
                background: "oklch(0.72 0.14 65)",
                color: "oklch(0.12 0.02 65)",
                boxShadow: "0 2px 12px oklch(0.72 0.14 65 / 0.35)",
                border: "none",
              }}
            >
              Get a Quote
            </Button>
          </Link>

          <Button
            data-ocid="nav.button"
            variant="outline"
            size="sm"
            disabled={isLoggingIn}
            onClick={handleAuth}
            className="hidden md:inline-flex border text-xs"
            style={{
              borderColor: "oklch(0.28 0.04 232)",
              color: "oklch(0.65 0.03 232)",
              background: "transparent",
            }}
          >
            {isLoggingIn
              ? "Logging in..."
              : isAuthenticated
                ? "Logout"
                : "Login"}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                style={{ color: "oklch(0.82 0.01 232)" }}
                data-ocid="nav.toggle"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              style={{
                background: "oklch(0.14 0.022 232)",
                borderColor: "oklch(0.24 0.03 232)",
              }}
            >
              <nav className="flex flex-col gap-2 mt-8">
                {[...navLinks, { label: "Admin", to: "/admin" }].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    data-ocid="nav.link"
                    className="px-4 py-3 text-base font-medium rounded transition-colors"
                    style={{ color: "oklch(0.78 0.02 232)" }}
                    activeProps={{
                      style: { color: "oklch(0.72 0.14 65)", fontWeight: 600 },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  data-ocid="nav.primary_button"
                >
                  <Button
                    className="mt-4 w-full font-semibold"
                    style={{
                      background: "oklch(0.72 0.14 65)",
                      color: "oklch(0.12 0.02 65)",
                      border: "none",
                    }}
                  >
                    Get a Quote
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="w-full"
                  style={{
                    borderColor: "oklch(0.28 0.04 232)",
                    color: "oklch(0.65 0.03 232)",
                    background: "transparent",
                  }}
                  data-ocid="nav.button"
                >
                  {isLoggingIn
                    ? "Logging in..."
                    : isAuthenticated
                      ? "Logout"
                      : "Login"}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
