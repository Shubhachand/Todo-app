import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import "../App.css";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description cannot be empty.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        setTitle("");
        setDescription("");
        setTodos((prevTodos) => [...prevTodos, { _id: res.data.todo._id, title, description }]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/todo");
        const data = await response.json();
        if (data.todos && Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App 🚀</h1>
        <div className="flex flex-col gap-4 mb-4">
          <Input
            type="text"
            placeholder="Add a new Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <Textarea
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAddTodo} className="bg-blue-600 hover:bg-blue-700 transition-colors">
            Add 🚀
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 p-4">
        {Array.isArray(todos) && todos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {todos.map((todo) =>
              todo?._id ? (
                <Card key={todo._id} className="bg-gray-800 rounded-lg shadow-lg">
                  <CardContent>
                    <h2 className="text-lg font-semibold text-white">{todo?.title}</h2>
                    <p className="text-gray-300">{todo?.description}</p>
                  </CardContent>
                </Card>
              ) : null
            )}
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-400">No todos available</p>
        )}
      </div>
    </div>
  );
};

export default Home;