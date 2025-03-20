import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // ✅ Fixed onChange handler
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Fixed loginHandler
  const loginHandler = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Ensures cookies are sent with the request
        body: JSON.stringify(user),
      });

      const resData = await response.json();

      if (response.ok) {
        // alert("Login successful");
        // toast.success(res.data.msg)
        toast.success(resData.msg);
        navigate("/");
        
      } else {
       alert("Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>

      <Input
        name="email"
        value={user.email}
        onChange={changeHandler}
        type="text"
        placeholder="Email"
        className="mb-4"
      />
      <Input
        name="password"
        value={user.password}
        onChange={changeHandler}
        type="password"
        placeholder="Password"
        className="mb-4"
      />
      <Button
        onClick={loginHandler}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Login 🚀
      </Button>
    </div>
  );
};

export default Login;
