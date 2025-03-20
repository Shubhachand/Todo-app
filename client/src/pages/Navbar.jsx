import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async() =>{
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout")
      if(res.data.success){
        // alert(res.data.msg);
        toast.success(res.data.msg);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <div className="bg-gray-600 p-2 rounded-md">
      <div className=" flex justify-between items-center">
        <h1 className="font-bold text-lg">{"Todo app "}</h1>
        <Button onClick={logoutHandler}> Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
