exports.errorHandler = (err, req, res, next) => {
  console.log("Error:", err.stack);
  res.status(500).json({
    message: "Server Error",
  });
};
