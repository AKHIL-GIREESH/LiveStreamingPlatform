import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import LandingPage from "@/Pages/LandingPage.tsx"
import Login from "@/Pages/Login/Login"
import SignUp from "./Pages/SignUp/SignUp";
import AuthProvider from "./AuthProvider";
import ProfilePg from "./Pages/Profile/ProfilePg";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:"/SignUp",
    element:<SignUp/>
  },
  {
    path:"/me",
    element:<ProfilePg/>
  },
  // {
  //   path:"/:id",
  //   element
  // }
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
