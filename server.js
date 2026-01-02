import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";

import authRoutes from "./Routes/authRoutes.js";
import expenseRoutes from "./Routes/expenseRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
