import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import DownloadsPage from "./pages/DownloadsPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import VideosPage from "./pages/VideosPage";

const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});
const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/videos",
  component: VideosPage,
});
const downloadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/downloads",
  component: DownloadsPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  videosRoute,
  downloadsRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

export { Link, useNavigate };
