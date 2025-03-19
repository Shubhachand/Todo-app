import React from "react";
import { Button } from "@/components/ui/button";
import "./App.css";
import  Navbar from "@/pages/Navbar";
function App() {
  return (
    <div >
    <Navbar/>
      <Button onClick={() => alert("ShadCN Button Clicked!")}>Lets build todo app </Button>
    </div>
  );
}

export default App;
