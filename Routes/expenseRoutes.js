import express from "express";
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../Controllers/expenseController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/getAllExpenses", protect, getExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;
