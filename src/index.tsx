import "./index.css";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ContentProvider } from "./content/ContentProvider";

// The admin panel is a separate bundle, loaded only on /admin.
const AdminApp = lazy(() => import("./admin/AdminApp"));
const isAdmin = window.location.pathname.replace(/\/+$/, "") === "/admin";

const rootEl = document.getElementById("root");
if (rootEl && isAdmin) {
  ReactDOM.createRoot(rootEl).render(
    <Suspense fallback={null}>
      <AdminApp />
    </Suspense>
  );
} else if (rootEl) {
  const site =
  <ContentProvider>
      <App />
    </ContentProvider>;

  // Production HTML is pre-rendered for search engines; attach to it instead of re-drawing.
  if (rootEl.hasChildNodes()) ReactDOM.hydrateRoot(rootEl, site);else
  ReactDOM.createRoot(rootEl).render(site);
}
