import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import { ThemeProvider } from "./shadcn/components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
