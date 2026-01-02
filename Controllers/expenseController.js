import Expense from "../Models/Expense.js";

// Add Expense
export const addExpense = async (req, res) => {
  const { title, amount, date } = req.body;

  const expense = await Expense.create({
    user: req.user,
    title,
    amount,
    date
  });

  res.status(201).json(expense);
};

// Get Expenses
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ user: req.user });
  res.json(expenses);
};


// Update Expense
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date } = req.body;

  const expense = await Expense.findByIdAndUpdate(
    id,
    { title, amount, date },
    { new: true }
  );

  res.status(201).json(expense);
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.status(201).json({ message: "Expense deleted successfully" });
};