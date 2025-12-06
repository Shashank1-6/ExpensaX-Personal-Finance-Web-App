import { fetchStats, fetchTransactions } from "./api.js";

function createPieChart(income, expense) {
  const ctx = document.getElementById("pieChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#16A34A", "#DC2626"]
      }]
    }
  });
}

function createBarChart(categoriesObj) {
  const ctx = document.getElementById("barChart");
  if (!ctx) return;

  const labels = Object.keys(categoriesObj);
  const data = Object.values(categoriesObj);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Expenses",
        data,
        backgroundColor: "#6366F1"
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const stats = await fetchStats();
  const transactions = await fetchTransactions();

  // Pie chart
  createPieChart(stats.income || 0, stats.expense || 0);

  // Category expenses only (type = expense)
  const categories = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      const cat = t.category || "Other";
      const amt = Number(t.amount) || 0;
      categories[cat] = (categories[cat] || 0) + amt;
    });

  createBarChart(categories);
});
