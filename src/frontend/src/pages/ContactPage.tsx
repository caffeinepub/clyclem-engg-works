import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "../hooks/useQueries";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitInquiry();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Inquiry submitted! We'll get back to you soon.");
        },
        onError: () => toast.error("Failed to submit. Please try again."),
      },
    );
  };

  return (
    <div style={{ background: "oklch(0.12 0.018 232)", minHeight: "100vh" }}>
      {/* Page hero banner */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ background: "oklch(0.1 0.015 232)" }}
      >
        <div className="absolute inset-0 hero-grid-pattern opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              ✦ Get In Touch
            </p>
            <h1
              className="font-heading text-5xl md:text-6xl font-bold mb-4"
              style={{ color: "oklch(0.94 0.01 232)" }}
            >
              Contact <span className="text-gold-shimmer">Us</span>
            </h1>
            <p
              className="text-base max-w-xl"
              style={{ color: "oklch(0.6 0.025 232)" }}
            >
              Get in touch for bulk orders, custom specifications, or general
              inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-20 rounded-xl"
                style={{
                  background: "oklch(0.15 0.022 232)",
                  border: "1px solid oklch(0.24 0.03 232)",
                }}
                data-ocid="contact.success_state"
              >
                <CheckCircle
                  className="w-14 h-14 mb-4"
                  style={{ color: "oklch(0.65 0.18 145)" }}
                />
                <h2
                  className="font-heading text-xl font-bold mb-2"
                  style={{ color: "oklch(0.92 0.01 232)" }}
                >
                  Thank you!
                </h2>
                <p
                  className="text-sm text-center"
                  style={{ color: "oklch(0.55 0.025 232)" }}
                >
                  Your inquiry has been received. Our team will contact you
                  within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  data-ocid="contact.secondary_button"
                  style={{
                    borderColor: "oklch(0.28 0.04 232)",
                    color: "oklch(0.65 0.04 232)",
                    background: "transparent",
                  }}
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  border: "1px solid oklch(0.24 0.03 232)",
                }}
              >
                {/* Dark header panel */}
                <div
                  className="px-6 py-5"
                  style={{
                    background: "oklch(0.13 0.02 232)",
                    borderBottom: "1px solid oklch(0.72 0.14 65 / 0.2)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-base"
                      style={{
                        background: "oklch(0.16 0.022 232)",
                        border: "1.5px solid oklch(0.72 0.14 65 / 0.7)",
                        color: "oklch(0.72 0.14 65)",
                      }}
                    >
                      C
                    </div>
                    <div>
                      <div
                        className="font-heading font-bold text-base"
                        style={{ color: "oklch(0.92 0.01 232)" }}
                      >
                        Clyclem Engg Works
                      </div>
                      <div
                        className="text-[10px] tracking-widest uppercase"
                        style={{ color: "oklch(0.72 0.14 65)" }}
                      >
                        Send an Inquiry
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ background: "oklch(0.15 0.022 232)" }}
                  className="p-6"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="contact.modal"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          style={{ color: "oklch(0.72 0.025 232)" }}
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Rajesh Kumar"
                          required
                          autoComplete="name"
                          data-ocid="contact.input"
                          style={{
                            background: "oklch(0.18 0.025 232)",
                            borderColor: "oklch(0.26 0.035 232)",
                            color: "oklch(0.88 0.01 232)",
                          }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          style={{ color: "oklch(0.72 0.025 232)" }}
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="rajesh@example.com"
                          required
                          autoComplete="email"
                          data-ocid="contact.input"
                          style={{
                            background: "oklch(0.18 0.025 232)",
                            borderColor: "oklch(0.26 0.035 232)",
                            color: "oklch(0.88 0.01 232)",
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        style={{ color: "oklch(0.72 0.025 232)" }}
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        data-ocid="contact.input"
                        style={{
                          background: "oklch(0.18 0.025 232)",
                          borderColor: "oklch(0.26 0.035 232)",
                          color: "oklch(0.88 0.01 232)",
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        style={{ color: "oklch(0.72 0.025 232)" }}
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please describe your requirements — material, size, quantity, and application..."
                        rows={5}
                        required
                        data-ocid="contact.textarea"
                        style={{
                          background: "oklch(0.18 0.025 232)",
                          borderColor: "oklch(0.26 0.035 232)",
                          color: "oklch(0.88 0.01 232)",
                        }}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full font-semibold"
                      data-ocid="contact.submit_button"
                      style={{
                        background: "oklch(0.72 0.14 65)",
                        color: "oklch(0.12 0.02 65)",
                        boxShadow: "0 2px 16px oklch(0.72 0.14 65 / 0.3)",
                        border: "none",
                      }}
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {isPending ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              style={{
                background: "oklch(0.15 0.022 232)",
                border: "1px solid oklch(0.24 0.03 232)",
                borderTop: "2px solid oklch(0.42 0.16 230)",
              }}
            >
              <div
                className="px-5 pt-5 pb-3 border-b"
                style={{ borderColor: "oklch(0.22 0.03 232)" }}
              >
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.88 0.01 232)" }}
                >
                  Company Information
                </h3>
              </div>
              <CardContent className="space-y-4 pt-4">
                {[
                  {
                    icon: MapPin,
                    text: "121/2, Stella Smruti House, Nalai Wadi, Saloli, Vasai West, Vasai Virar, Palghar, Maharashtra 401201",
                  },
                  { icon: Phone, text: "+91 96651 67630" },
                  { icon: Phone, text: "+91 93220 76462" },
                  { icon: Mail, text: "clyclemengineering@gmail.com" },
                  { icon: Mail, text: "andradesclive@gmail.com" },
                  { icon: Clock, text: "Mon – Sat: 9:00 AM – 6:00 PM" },
                ].map(({ icon: Icon, text }, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div
                      className="w-7 h-7 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "oklch(0.42 0.16 230 / 0.1)",
                        border: "1px solid oklch(0.42 0.16 230 / 0.2)",
                      }}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: "oklch(0.65 0.1 230)" }}
                      />
                    </div>
                    <span style={{ color: "oklch(0.62 0.025 232)" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card
              style={{
                background: "oklch(0.14 0.022 232)",
                border: "1px solid oklch(0.24 0.03 232)",
                borderTop: "2px solid oklch(0.72 0.14 65 / 0.6)",
              }}
            >
              <div
                className="px-5 pt-5 pb-3 border-b"
                style={{ borderColor: "oklch(0.22 0.03 232)" }}
              >
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.72 0.14 65)" }}
                >
                  Why Choose Clyclem?
                </h3>
              </div>
              <CardContent className="p-5">
                <ul className="space-y-3">
                  {[
                    "Pan-India delivery within 3–5 days",
                    "Custom sizes and finishes available",
                    "Bulk order discounts",
                    "ISO 9001:2015 certified manufacturing",
                  ].map((item, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0"
                        style={{ color: "oklch(0.72 0.14 65)" }}
                      />
                      <span style={{ color: "oklch(0.65 0.025 232)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
