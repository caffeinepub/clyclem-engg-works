import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExternalBlob } from "../backend";
import type { Inquiry, Pdf, Product, Video } from "../backend.d";
import { useActor } from "./useActor";

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetVideos() {
  const { actor, isFetching } = useActor();
  return useQuery<Video[]>({
    queryKey: ["videos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPdfs() {
  const { actor, isFetching } = useActor();
  return useQuery<Pdf[]>({
    queryKey: ["pdfs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPdfs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
    }: { name: string; email: string; phone: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(name, email, phone, message);
    },
  });
}

export function useUploadVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      file,
    }: { title: string; description: string; file: ExternalBlob }) => {
      if (!actor) throw new Error("Not connected");
      return actor.uploadVideo(title, description, file);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useUploadPdf() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      file,
    }: { title: string; description: string; file: ExternalBlob }) => {
      if (!actor) throw new Error("Not connected");
      return actor.uploadPdf(title, description, file);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pdfs"] }),
  });
}

export function useDeleteVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteVideo(videoId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useDeletePdf() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pdfId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePdf(pdfId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pdfs"] }),
  });
}

export function useSeedProducts() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.seedProducts();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
