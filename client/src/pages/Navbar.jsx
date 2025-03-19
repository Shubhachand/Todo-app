import React from "react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  return (
    <div className="bg-gray-600 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1>{"Todo app "}</h1>
        <Button> Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
