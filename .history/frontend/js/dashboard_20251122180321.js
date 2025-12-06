// dashboard.js (Full File)
// Connects UI with backend stats & charts

import { fetchStats, fetchTransactions } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {

  // 1️⃣ Get summary values from backend
  const stats = await fetchStats();
  if (stats) {
    document.getElementById("income").innerText = `₹ ${stats.income}`;
    document.getElementById("expense").innerText = `₹ ${stats.expense}`;
    document.getElementById("balance").innerText = `₹ ${stats.balance}`;
  }

  // 2️⃣ Get transactions
  const transactions = await fetchTransactions();

  // Format monthly numbers for bar chart
  const monthlyTotals = Array(12).fill(0);
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  transactions.forEach(t => {
    const month = new Date(t.date).getMonth();
    monthlyTotals[month] += t.amount * (t.type === "expense" ? -1 : 1);
  });

  // Render Bar Chart
  var bar = new ApexCharts(document.querySelector("#barChart"), {
    chart: { type: "bar", height: 250 },
    series: [{ name: "Net Amount", data: monthlyTotals }],
    xaxis: { categories: monthNames }
  });
  bar.render();

  // Render Pie Chart (category sum)
  const categoryTotals = {};
  transactions.forEach(t => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += t.amount;
  });

  var pie = new ApexCharts(document.querySelector("#pieChart"), {
    chart: { type: "pie", height: 250 },
    series: Object.values(categoryTotals),
    labels: Object.keys(categoryTotals)
  });
  pie.render();

});
