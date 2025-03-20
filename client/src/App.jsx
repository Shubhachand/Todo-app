import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import "./App.css";
import Navbar from "@/pages/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <Home />
  },
  {
    path:"/login",
    element: <Login />
  }
]) 


function App() {
  

  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
