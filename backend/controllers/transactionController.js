const Transaction = require("../models/transactionModel");

// @desc Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, isRecurring, recurringInterval } = req.body;

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
      isRecurring,
      recurringInterval,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction" });
  }
};


// @desc Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

// @desc Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction" });
  }
};

// @desc Monthly statistics (income, expense, balance)
exports.getStats = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    res.json({
      income,
      expense,
      balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating stats" });
  }
};
