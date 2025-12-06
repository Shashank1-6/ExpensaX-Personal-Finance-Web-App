import { fetchStats, fetchTransactions } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Load stats
  const stats = await fetchStats();
  document.getElementById("incomeValue").textContent = `₹${stats.income || 0}`;
  document.getElementById("expenseValue").textContent = `₹${stats.expense || 0}`;
  document.getElementById("balanceValue").textContent = `₹${stats.balance || 0}`;

  // Load recent transactions
  const list = document.getElementById("recentList");
  const all = await fetchTransactions();
  const recent = all.slice(0, 5);

  list.innerHTML = "";

  if (recent.length === 0) {
    list.innerHTML = `<li class="text-gray-500">No transactions yet.</li>`;
    return;
  }

  recent.forEach(t => {
    const li = document.createElement("li");
    li.className = "bg-white p-4 rounded-xl shadow flex justify-between items-center";
    li.innerHTML = `
      <div>
        <p class="font-semibold">${t.title}</p>
        <p class="text-sm text-gray-600">${t.category || "-"} • ${new Date(t.date).toLocaleDateString()}</p>
      </div>
      <div class="text-right ${t.type === "income" ? "text-green-600" : "text-red-600"} font-bold">
        ₹${t.amount}
      </div>
    `;
    list.appendChild(li);
  });
});
