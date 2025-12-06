const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Rent",
        "Shopping",
        "Medicine",
        "Utilities",
        "Subscription",
        "Salary",
        "Other"
      ],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    // For recurring salary
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringInterval: {
      type: String,
      enum: ["monthly", "yearly", null],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
