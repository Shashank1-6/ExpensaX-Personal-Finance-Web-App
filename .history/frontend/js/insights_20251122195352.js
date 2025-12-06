import { API_BASE_URL } from "./api.js";

async function fetchTransactions() {
  const res = await fetch(`${API_BASE_URL}/transactions`);
  return res.json();
}

function createPieChart(income, expense) {
  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#16A34A", "#DC2626"],
      }],
    },
  });
}

function createBarChart(categories) {
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        label: "Expenses",
        data: Object.values(categories),
        backgroundColor: "#6366F1",
      }],
    },
    options: {
      scales: { y: { beginAtZero: true } }
    }
  });
}

async function loadCharts() {
  const transactions = await fetchTransactions();

  // Pie Chart calculation
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  createPieChart(income, expense);

  // Category expenses
  const categories = {};
  transactions.filter(t => t.type === "expense").forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
  });

  createBarChart(categories);
}

loadCharts();
