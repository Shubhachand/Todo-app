import express from 'express';
import { createTodo, getAllTodos, updateTodo, deleteTodo } from '../controllers/todo.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// Routes for creating and fetching todos
router.route("/")
    .post(isAuthenticated, createTodo)
    .get(getAllTodos);

// Routes for updating and deleting specific todos
router.route("/:todoId")
    .put(isAuthenticated, updateTodo)
    .delete(isAuthenticated, deleteTodo);

export default router;
