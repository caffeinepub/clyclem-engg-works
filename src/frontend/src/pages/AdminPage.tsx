import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
  FileText,
  Loader2,
  Lock,
  Mail,
  Trash2,
  Upload,
  Video as VideoIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useDeletePdf,
  useDeleteVideo,
  useGetInquiries,
  useGetPdfs,
  useGetVideos,
  useIsCallerAdmin,
  useUploadPdf,
  useUploadVideo,
} from "../hooks/useQueries";

function LoginGate() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh]"
      data-ocid="admin.modal"
    >
      <Lock
        className="w-14 h-14 mb-6"
        style={{ color: "oklch(0.62 0.12 230)" }}
      />
      <h2
        className="font-heading text-2xl font-bold mb-2"
        style={{ color: "oklch(0.18 0.025 230)" }}
      >
        Admin Access
      </h2>
      <p className="text-sm mb-6" style={{ color: "oklch(0.5 0.04 230)" }}>
        Please log in to access the admin panel.
      </p>
      <Button
        onClick={login}
        disabled={isLoggingIn}
        data-ocid="admin.primary_button"
        style={{ background: "oklch(0.44 0.13 230)", color: "oklch(0.97 0 0)" }}
      >
        {isLoggingIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLoggingIn ? "Logging in..." : "Login"}
      </Button>
    </div>
  );
}

function AccessDenied() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh]"
      data-ocid="admin.error_state"
    >
      <Lock
        className="w-14 h-14 mb-6"
        style={{ color: "oklch(0.577 0.245 27)" }}
      />
      <h2
        className="font-heading text-2xl font-bold mb-2"
        style={{ color: "oklch(0.18 0.025 230)" }}
      >
        Access Denied
      </h2>
      <p className="text-sm" style={{ color: "oklch(0.5 0.04 230)" }}>
        You don't have admin privileges.
      </p>
    </div>
  );
}

function UploadVideoForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadVideo();

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !title) {
      toast.error("Title and video file are required.");
      return;
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
      setProgress(p),
    );
    mutate(
      { title, description: desc, file: blob },
      {
        onSuccess: () => {
          toast.success("Video uploaded!");
          setTitle("");
          setDesc("");
          setProgress(0);
          if (fileRef.current) fileRef.current.value = "";
        },
        onError: () => {
          toast.error("Upload failed.");
          setProgress(0);
        },
      },
    );
  };

  return (
    <Card className="border mb-8">
      <CardHeader>
        <CardTitle className="font-heading text-base">
          Upload New Video
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>Title *</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Factory Tour 2024"
            data-ocid="admin.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Brief description of the video..."
            data-ocid="admin.textarea"
            rows={3}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Video File *</Label>
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            className="block w-full text-sm"
            data-ocid="admin.upload_button"
          />
        </div>
        {isPending && (
          <Progress
            value={progress}
            className="h-2"
            data-ocid="admin.loading_state"
          />
        )}
        <Button
          onClick={handleUpload}
          disabled={isPending}
          data-ocid="admin.submit_button"
          style={{
            background: "oklch(0.44 0.13 230)",
            color: "oklch(0.97 0 0)",
          }}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 w-4 h-4" />
          )}
          {isPending ? "Uploading..." : "Upload Video"}
        </Button>
      </CardContent>
    </Card>
  );
}

function UploadPdfForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadPdf();

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !title) {
      toast.error("Title and PDF file are required.");
      return;
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
      setProgress(p),
    );
    mutate(
      { title, description: desc, file: blob },
      {
        onSuccess: () => {
          toast.success("PDF uploaded!");
          setTitle("");
          setDesc("");
          setProgress(0);
          if (fileRef.current) fileRef.current.value = "";
        },
        onError: () => {
          toast.error("Upload failed.");
          setProgress(0);
        },
      },
    );
  };

  return (
    <Card className="border mb-8">
      <CardHeader>
        <CardTitle className="font-heading text-base">Upload New PDF</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>Title *</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Catalogue 2024"
            data-ocid="admin.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Brief description of the document..."
            data-ocid="admin.textarea"
            rows={3}
          />
        </div>
        <div className="space-y-1.5">
          <Label>PDF File *</Label>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            className="block w-full text-sm"
            data-ocid="admin.upload_button"
          />
        </div>
        {isPending && (
          <Progress
            value={progress}
            className="h-2"
            data-ocid="admin.loading_state"
          />
        )}
        <Button
          onClick={handleUpload}
          disabled={isPending}
          data-ocid="admin.submit_button"
          style={{
            background: "oklch(0.44 0.13 230)",
            color: "oklch(0.97 0 0)",
          }}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 w-4 h-4" />
          )}
          {isPending ? "Uploading..." : "Upload PDF"}
        </Button>
      </CardContent>
    </Card>
  );
}

function VideosList() {
  const { data: videos, isLoading } = useGetVideos();
  const { mutate: deleteVideo, isPending } = useDeleteVideo();

  if (isLoading)
    return <Skeleton className="h-32 w-full" data-ocid="admin.loading_state" />;
  if (!videos || videos.length === 0)
    return (
      <p
        className="text-sm py-6 text-center"
        style={{ color: "oklch(0.5 0.04 230)" }}
        data-ocid="admin.empty_state"
      >
        No videos uploaded yet.
      </p>
    );

  return (
    <Table data-ocid="admin.table">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {videos.map((v, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: video list
          <TableRow key={i} data-ocid={`admin.row.${i + 1}`}>
            <TableCell className="font-medium">{v.title}</TableCell>
            <TableCell
              className="text-sm"
              style={{ color: "oklch(0.5 0.04 230)" }}
            >
              {v.description || "—"}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                disabled={isPending}
                onClick={() =>
                  deleteVideo(BigInt(i), {
                    onSuccess: () => toast.success("Deleted"),
                    onError: () => toast.error("Delete failed"),
                  })
                }
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2
                  className="w-4 h-4"
                  style={{ color: "oklch(0.577 0.245 27)" }}
                />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function PdfsList() {
  const { data: pdfs, isLoading } = useGetPdfs();
  const { mutate: deletePdf, isPending } = useDeletePdf();

  if (isLoading)
    return <Skeleton className="h-32 w-full" data-ocid="admin.loading_state" />;
  if (!pdfs || pdfs.length === 0)
    return (
      <p
        className="text-sm py-6 text-center"
        style={{ color: "oklch(0.5 0.04 230)" }}
        data-ocid="admin.empty_state"
      >
        No PDFs uploaded yet.
      </p>
    );

  return (
    <Table data-ocid="admin.table">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pdfs.map((p, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: pdf list
          <TableRow key={i} data-ocid={`admin.row.${i + 1}`}>
            <TableCell className="font-medium">{p.title}</TableCell>
            <TableCell
              className="text-sm"
              style={{ color: "oklch(0.5 0.04 230)" }}
            >
              {p.description || "—"}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                disabled={isPending}
                onClick={() =>
                  deletePdf(BigInt(i), {
                    onSuccess: () => toast.success("Deleted"),
                    onError: () => toast.error("Delete failed"),
                  })
                }
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2
                  className="w-4 h-4"
                  style={{ color: "oklch(0.577 0.245 27)" }}
                />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function InquiriesList() {
  const { data: inquiries, isLoading } = useGetInquiries();
  if (isLoading)
    return <Skeleton className="h-32 w-full" data-ocid="admin.loading_state" />;
  if (!inquiries || inquiries.length === 0)
    return (
      <p
        className="text-sm py-6 text-center"
        style={{ color: "oklch(0.5 0.04 230)" }}
        data-ocid="admin.empty_state"
      >
        No inquiries yet.
      </p>
    );
  return (
    <Table data-ocid="admin.table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inquiries.map((inq, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: inquiry list
          <TableRow key={i} data-ocid={`admin.row.${i + 1}`}>
            <TableCell className="font-medium">{inq.name}</TableCell>
            <TableCell>{inq.email}</TableCell>
            <TableCell>{inq.phone || "—"}</TableCell>
            <TableCell className="text-sm max-w-xs truncate">
              {inq.message}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function AdminPage() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (!identity)
    return (
      <div className="container mx-auto px-4 py-12">
        <LoginGate />
      </div>
    );
  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-16 w-48 mb-4" data-ocid="admin.loading_state" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  if (!isAdmin)
    return (
      <div className="container mx-auto px-4 py-12">
        <AccessDenied />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1
          className="font-heading text-4xl font-bold mb-2"
          style={{ color: "oklch(0.18 0.025 230)" }}
        >
          Admin Panel
        </h1>
        <p className="text-sm" style={{ color: "oklch(0.5 0.04 230)" }}>
          Manage videos, PDF documents, and customer inquiries.
        </p>
      </motion.div>

      <Tabs defaultValue="videos" data-ocid="admin.tab">
        <TabsList className="mb-8">
          <TabsTrigger value="videos" data-ocid="admin.tab">
            <VideoIcon className="w-4 h-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="pdfs" data-ocid="admin.tab">
            <FileText className="w-4 h-4 mr-2" />
            PDFs
          </TabsTrigger>
          <TabsTrigger value="inquiries" data-ocid="admin.tab">
            <Mail className="w-4 h-4 mr-2" />
            Inquiries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <UploadVideoForm />
          <h3
            className="font-heading font-semibold text-base mb-4"
            style={{ color: "oklch(0.25 0.04 230)" }}
          >
            Existing Videos
          </h3>
          <VideosList />
        </TabsContent>

        <TabsContent value="pdfs">
          <UploadPdfForm />
          <h3
            className="font-heading font-semibold text-base mb-4"
            style={{ color: "oklch(0.25 0.04 230)" }}
          >
            Existing PDFs
          </h3>
          <PdfsList />
        </TabsContent>

        <TabsContent value="inquiries">
          <h3
            className="font-heading font-semibold text-base mb-4"
            style={{ color: "oklch(0.25 0.04 230)" }}
          >
            Customer Inquiries
          </h3>
          <InquiriesList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
