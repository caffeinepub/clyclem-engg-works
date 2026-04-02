import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  module Video {
    public func compare(v1 : Video, v2 : Video) : Order.Order {
      Text.compare(v1.title, v2.title);
    };
  };

  module Pdf {
    public func compare(p1 : Pdf, p2 : Pdf) : Order.Order {
      Text.compare(p1.title, p2.title);
    };
  };

  module Inquiry {
    public func compare(i1 : Inquiry, i2 : Inquiry) : Order.Order {
      Text.compare(i1.name, i2.name);
    };
  };

  public type Product = {
    name : Text;
    description : Text;
    material : Text;
    size : Text;
    category : Text;
  };

  public type ProductState = {
    #active : Product;
    #deleted;
  };

  public type Video = {
    title : Text;
    description : Text;
    file : Storage.ExternalBlob;
  };

  public type Pdf = {
    title : Text;
    description : Text;
    file : Storage.ExternalBlob;
  };

  public type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  // Products
  let products = List.empty<ProductState>();

  public type VideoId = Nat;
  public type PdfId = Nat;
  public type InquiryId = Nat;

  // Videos
  var nextVideoId : VideoId = 1;
  let videos = Map.empty<VideoId, Video>();

  // PDFs
  var nextPdfId : PdfId = 1;
  let pdfs = Map.empty<PdfId, Pdf>();

  // Inquiries
  var nextInquiryId : InquiryId = 1;
  let inquiries = Map.empty<InquiryId, Inquiry>();

  // Restrict access to admin for upload/delete functions
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Include file storage
  include MixinStorage();

  public shared ({ caller }) func seedProducts() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can seed products");
    };
    let defaultProducts : [ProductState] = [
      #active {
        name = "Stainless Steel Round Flat Washer 2mm";
        description = "High quality stainless steel washer with 2mm thickness";
        material = "Stainless Steel";
        size = "2mm";
        category = "Round Flat";
      },
      #active {
        name = "Mild Steel Round Flat Washer";
        description = "Durable mild steel round flat washer";
        material = "Mild Steel";
        size = "Variety";
        category = "Round Flat";
      },
      #active {
        name = "Stainless Steel Round Flat Washer 3mm";
        description = "Stainless steel washer with 3mm thickness";
        material = "Stainless Steel";
        size = "3mm";
        category = "Round Flat";
      },
      #active {
        name = "Galvanized Iron Round Flat Washer 1.5mm";
        description = "Galvanized iron washer with 1.5mm thickness";
        material = "Galvanized Iron";
        size = "1.5mm";
        category = "Round Flat";
      },
      #active {
        name = "Plain Metal Washers";
        description = "Standard plain metal washers for various uses";
        material = "Metal";
        size = "Variety";
        category = "Plain";
      },
      #active {
        name = "Mild Square Plate Washer";
        description = "Square plate washer made of mild steel";
        material = "Mild Steel";
        size = "Variety";
        category = "Square Plate";
      },
      #active {
        name = "Carbon Steel Square Taper Washer";
        description = "Square taper washer made from carbon steel";
        material = "Carbon Steel";
        size = "Variety";
        category = "Square Taper";
      },
      #active {
        name = "Mild Steel Round Punch Washer 2mm";
        description = "Mild steel round punch washer with 2mm thickness";
        material = "Mild Steel";
        size = "2mm";
        category = "Round Punch";
      },
      #active {
        name = "Mild Steel Rectangular Flat Washer 2mm";
        description = "Rectangular flat washer made of mild steel with 2mm thickness";
        material = "Mild Steel";
        size = "2mm";
        category = "Rectangular Flat";
      },
      #active {
        name = "Mild Steel Washer";
        description = "General purpose mild steel washer";
        material = "Mild Steel";
        size = "Variety";
        category = "General";
      },
    ];

    products.clear();
    products.addAll(defaultProducts.values());
  };

  // Product management - Anyone can access
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().filter(
      func(state) { switch (state) { case (#active _) { true }; case (#deleted) { false } } }
    ).map(
      func(state) {
        switch (state) {
          case (#active product) { product };
          case (#deleted) { Runtime.trap("Unexpected deleted product") };
        };
      }
    ).toArray().sort();
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can add products") };
    products.add(#active product);
  };

  public shared ({ caller }) func updateProduct(index : Nat, product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can update products") };
    if (index >= products.size()) { Runtime.trap("Product index out of bounds") };
    products.put(index, #active product);
  };

  public shared ({ caller }) func deleteProduct(index : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can delete products") };
    if (index >= products.size()) { Runtime.trap("Product index out of bounds") };
    products.put(index, #deleted);
  };

  // Video management - Only admin can upload/delete, anyone can view
  public shared ({ caller }) func uploadVideo(title : Text, description : Text, file : Storage.ExternalBlob) : async VideoId {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can upload videos") };
    let video : Video = {
      title;
      description;
      file;
    };
    let videoId = nextVideoId;
    videos.add(videoId, video);
    nextVideoId += 1;
    videoId;
  };

  public shared ({ caller }) func deleteVideo(videoId : VideoId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can delete videos") };
    if (not videos.containsKey(videoId)) {
      Runtime.trap("Video not found");
    };
    videos.remove(videoId);
  };

  public query ({ caller }) func getVideos() : async [Video] {
    videos.values().toArray().sort(Video.compare);
  };

  // PDF management - Only admin can upload/delete, anyone can view/download
  public shared ({ caller }) func uploadPdf(title : Text, description : Text, file : Storage.ExternalBlob) : async PdfId {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can upload PDFs") };
    let pdf : Pdf = {
      title;
      description;
      file;
    };
    let pdfId = nextPdfId;
    pdfs.add(pdfId, pdf);
    nextPdfId += 1;
    pdfId;
  };

  public shared ({ caller }) func deletePdf(pdfId : PdfId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can delete PDFs") };
    pdfs.remove(pdfId);
  };

  public query ({ caller }) func getPdfs() : async [Pdf] {
    pdfs.values().toArray().sort(Pdf.compare);
  };

  // Inquiry management - Anyone can submit, only admin can view all
  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, message : Text) : async InquiryId {
    if (name.trim(#char ' ') == "") { Runtime.trap("Name is required") };
    if (email.trim(#char ' ') == "") { Runtime.trap("Email is required") };
    if (message.trim(#char ' ') == "") { Runtime.trap("Message is required") };
    let inquiry : Inquiry = {
      name;
      email;
      phone;
      message;
    };
    let inquiryId = nextInquiryId;
    inquiries.add(inquiryId, inquiry);
    nextInquiryId += 1;
    inquiryId;
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) { Runtime.trap("Only admin can view inquiries") };
    inquiries.values().toArray().sort();
  };
};
