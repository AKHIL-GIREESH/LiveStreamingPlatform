import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.tsx";
import "./index.css";
import LandingPage from "@/Pages/LandingPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter,RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  }
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
