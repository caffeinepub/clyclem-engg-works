import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    title: string;
    file: ExternalBlob;
    description: string;
}
export type InquiryId = bigint;
export interface Pdf {
    title: string;
    file: ExternalBlob;
    description: string;
}
export type PdfId = bigint;
export type VideoId = bigint;
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface Product {
    name: string;
    size: string;
    description: string;
    category: string;
    material: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deletePdf(pdfId: PdfId): Promise<void>;
    deleteProduct(index: bigint): Promise<void>;
    deleteVideo(videoId: VideoId): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiries(): Promise<Array<Inquiry>>;
    getPdfs(): Promise<Array<Pdf>>;
    getProducts(): Promise<Array<Product>>;
    getVideos(): Promise<Array<Video>>;
    isCallerAdmin(): Promise<boolean>;
    seedProducts(): Promise<void>;
    submitInquiry(name: string, email: string, phone: string, message: string): Promise<InquiryId>;
    updateProduct(index: bigint, product: Product): Promise<void>;
    uploadPdf(title: string, description: string, file: ExternalBlob): Promise<PdfId>;
    uploadVideo(title: string, description: string, file: ExternalBlob): Promise<VideoId>;
}
