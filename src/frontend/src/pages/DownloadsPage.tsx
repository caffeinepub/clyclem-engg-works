import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, FileText } from "lucide-react";
import { motion } from "motion/react";
import type { Pdf } from "../backend.d";
import { useGetPdfs } from "../hooks/useQueries";

const SAMPLE_PDFS = [
  {
    title: "Product Catalogue 2024",
    description:
      "Complete catalogue of all washer products with specifications, sizes, and materials.",
  },
  {
    title: "Quality Standards Compliance",
    description:
      "ISO 9001:2015 compliance documentation and quality process overview.",
  },
  {
    title: "Technical Specifications Sheet",
    description:
      "Detailed technical specs for stainless steel and mild steel washer grades.",
  },
];

function PdfCard({
  title,
  description,
  url,
  index,
}: { title: string; description: string; url?: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      data-ocid={`downloads.item.${index + 1}`}
    >
      <Card className="border hover:shadow-steel transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-lg shrink-0"
              style={{ background: "oklch(0.44 0.13 230 / 0.12)" }}
            >
              <FileText
                className="w-5 h-5"
                style={{ color: "oklch(0.44 0.13 230)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="font-heading text-base truncate">
                {title}
              </CardTitle>
              {description && (
                <p
                  className="text-sm mt-1"
                  style={{ color: "oklch(0.5 0.04 230)" }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {url ? (
            <Button
              asChild
              variant="outline"
              size="sm"
              data-ocid={`downloads.button.${index + 1}`}
              style={{
                borderColor: "oklch(0.44 0.13 230)",
                color: "oklch(0.44 0.13 230)",
              }}
            >
              <a href={url} target="_blank" rel="noopener noreferrer" download>
                <Download className="mr-2 w-4 h-4" /> Download PDF
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled
              data-ocid={`downloads.button.${index + 1}`}
              style={{
                borderColor: "oklch(0.88 0.01 230)",
                color: "oklch(0.65 0.02 230)",
              }}
            >
              <Download className="mr-2 w-4 h-4" /> Coming Soon
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function DownloadsPage() {
  const { data: pdfs, isLoading } = useGetPdfs();

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1
          className="font-heading text-4xl font-bold mb-3"
          style={{ color: "oklch(0.18 0.025 230)" }}
        >
          Downloads
        </h1>
        <p className="text-base" style={{ color: "oklch(0.5 0.04 230)" }}>
          Download product catalogues, technical data sheets, and quality
          documentation.
        </p>
      </motion.div>

      {isLoading ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-ocid="downloads.loading_state"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : pdfs && pdfs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pdfs.map((p: Pdf, i: number) => (
            <PdfCard
              key={p.title}
              title={p.title}
              description={p.description}
              url={p.file.getDirectURL()}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_PDFS.map((p, i) => (
            <PdfCard
              key={p.title}
              title={p.title}
              description={p.description}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
