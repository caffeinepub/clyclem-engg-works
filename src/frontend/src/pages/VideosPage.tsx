import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Info, Video as VideoIcon } from "lucide-react";
import { motion } from "motion/react";
import type { Video } from "../backend.d";
import { useGetVideos } from "../hooks/useQueries";

const FEATURED_VIDEOS = [
  {
    id: "SH4tZBmexE8",
    title: "Industrial Washer Manufacturing",
    description:
      "An inside look at how industrial washers are manufactured at scale using precision stamping machinery.",
  },
  {
    id: "ItMjzpJ5pGk",
    title: "Metal Stamping Process",
    description:
      "Detailed walkthrough of the metal stamping process used in washer and fastener production.",
  },
  {
    id: "HNXL8jDtDWk",
    title: "Washer Production Facility",
    description:
      "Tour of a modern washer production facility showcasing quality control and automated lines.",
  },
  {
    id: "WfONyBJlqA4",
    title: "Precision Metal Stamping",
    description:
      "See how precision metal stamping produces consistent, high-tolerance washers for industrial use.",
  },
];

function FeaturedVideoCard({
  video,
  index,
}: { video: (typeof FEATURED_VIDEOS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-ocid={`videos.item.${index + 1}`}
    >
      <div
        className="rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
        style={{
          background: "oklch(0.15 0.022 232)",
          borderColor: "oklch(0.24 0.03 232)",
          boxShadow: "0 4px 24px oklch(0.72 0.14 65 / 0.06)",
        }}
      >
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>
        <div className="p-4">
          <h3
            className="font-heading text-base font-semibold mb-1"
            style={{ color: "oklch(0.72 0.14 65)" }}
          >
            {video.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.6 0.025 232)" }}
          >
            {video.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function UploadedVideoCard({ video, index }: { video: Video; index: number }) {
  const url = video.file.getDirectURL();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      data-ocid={`videos.uploaded.item.${index + 1}`}
    >
      <Card className="overflow-hidden border hover:shadow-steel transition-shadow duration-200">
        <div className="aspect-video bg-muted">
          {/* biome-ignore lint/a11y/useMediaCaption: video captions managed by content owners */}
          <video
            src={url}
            controls
            className="w-full h-full object-cover"
            preload="metadata"
          />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base">
            {video.title}
          </CardTitle>
        </CardHeader>
        {video.description && (
          <CardContent className="pt-0">
            <p className="text-sm" style={{ color: "oklch(0.5 0.04 230)" }}>
              {video.description}
            </p>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}

export default function VideosPage() {
  const { data: videos, isLoading } = useGetVideos();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1
          className="font-heading text-4xl font-bold mb-3"
          style={{ color: "oklch(0.93 0.01 232)" }}
        >
          Video Gallery
        </h1>
        <p className="text-base" style={{ color: "oklch(0.6 0.025 232)" }}>
          Watch manufacturing process demonstrations, product showcases, and
          facility tours.
        </p>
      </motion.div>

      {/* Featured Videos */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-14"
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-1 h-7 rounded-full"
            style={{ background: "oklch(0.72 0.14 65)" }}
          />
          <h2
            className="font-heading text-2xl font-bold"
            style={{ color: "oklch(0.93 0.01 232)" }}
          >
            Featured Videos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED_VIDEOS.map((video, i) => (
            <FeaturedVideoCard key={video.id} video={video} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-5 flex items-start gap-2 px-4 py-3 rounded-lg"
          style={{
            background: "oklch(0.72 0.14 65 / 0.08)",
            border: "1px solid oklch(0.72 0.14 65 / 0.2)",
          }}
        >
          <Info
            className="w-4 h-4 mt-0.5 shrink-0"
            style={{ color: "oklch(0.72 0.14 65)" }}
          />
          <p className="text-xs" style={{ color: "oklch(0.6 0.025 232)" }}>
            Videos shown above are for reference and educational purposes only.
            Upload your own product videos via the{" "}
            <a
              href="/admin"
              className="underline"
              style={{ color: "oklch(0.72 0.14 65)" }}
            >
              admin panel
            </a>
            .
          </p>
        </motion.div>
      </motion.section>

      {/* Divider */}
      <div
        className="my-10 h-px w-full"
        style={{ background: "oklch(0.24 0.03 232)" }}
      />

      {/* Uploaded Videos */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-1 h-7 rounded-full"
            style={{ background: "oklch(0.72 0.14 65)" }}
          />
          <h2
            className="font-heading text-2xl font-bold"
            style={{ color: "oklch(0.93 0.01 232)" }}
          >
            Our Product Videos
          </h2>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-ocid="videos.loading_state"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((v, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: video list
              <UploadedVideoCard key={i} video={v} index={i} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-xl border"
            style={{
              borderColor: "oklch(0.24 0.03 232)",
              background: "oklch(0.15 0.022 232)",
            }}
            data-ocid="videos.empty_state"
          >
            <VideoIcon
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: "oklch(0.72 0.14 65 / 0.5)" }}
            />
            <p
              className="text-base font-heading font-semibold mb-2"
              style={{ color: "oklch(0.93 0.01 232)" }}
            >
              No product videos uploaded yet
            </p>
            <p className="text-sm" style={{ color: "oklch(0.6 0.025 232)" }}>
              Use the admin panel to upload your own product and facility
              videos.
            </p>
          </div>
        )}
      </motion.section>
    </div>
  );
}
