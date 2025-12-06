const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // load .env file

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // allow JSON request body

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/transactions", require("./routes/transactionRoutes"));

// Error handling middleware
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
