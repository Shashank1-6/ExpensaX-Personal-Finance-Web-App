import { fetchTransactions, addTransaction, deleteTransaction } from "./api.js";

let allTransactions = [];

const tableBody = document.getElementById("tableBody");
const cardList = document.getElementById("cardList");
const addBtn = document.getElementById("addBtn");
const addPanel = document.getElementById("addPanel");
const closePanel = document.getElementById("closePanel");
const saveBtn = document.getElementById("saveTransaction");

function openPanel() {
  addPanel.classList.remove("translate-x-full");
  document.body.style.overflow = "hidden";
}

function closePanelFn() {
  addPanel.classList.add("translate-x-full");
  document.body.style.overflow = "auto";
}

addBtn.addEventListener("click", openPanel);
closePanel.addEventListener("click", closePanelFn);

function renderTransactions(transactions) {
  tableBody.innerHTML = "";
  cardList.innerHTML = "";

  transactions.forEach(t => {
    // Table row
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-4">${t.title}</td>
      <td class="p-4">${t.category || "-"}</td>
      <td class="p-4">${t.type}</td>
      <td class="p-4 font-bold ${t.type === "income" ? "text-green-600" : "text-red-600"}">₹${t.amount}</td>
      <td class="p-4">${new Date(t.date).toLocaleDateString()}</td>
      <td class="p-4">
        <button class="deleteBtn text-red-600 font-bold" data-id="${t._id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);

    // Card view (mobile)
    const card = document.createElement("div");
    card.className = "bg-white shadow rounded-xl p-4 flex justify-between items-center";
    card.innerHTML = `
      <div>
        <p class="font-semibold">${t.title}</p>
        <p class="text-sm text-gray-600">${t.category || "-"} • ${new Date(t.date).toLocaleDateString()}</p>
      </div>
      <div class="text-right">
        <p class="font-bold ${t.type === "income" ? "text-green-600" : "text-red-600"}">₹${t.amount}</p>
        <button class="deleteBtn text-xs text-red-600 font-bold mt-1" data-id="${t._id}">Remove</button>
      </div>
    `;
    cardList.appendChild(card);
  });

  // Attach delete handlers
  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      await deleteTransaction(id);
      await loadTransactions();
    });
  });
}

async function loadTransactions() {
  allTransactions = await fetchTransactions();
  renderTransactions(allTransactions);
}

// Save new transaction
saveBtn.addEventListener("click", async () => {
  const amount = Number(document.getElementById("amountInput").value);
  const title = document.getElementById("titleInput").value.trim();
  const type = document.getElementById("typeSelect").value;
  const category = document.getElementById("categorySelect").value;

  if (!title || !amount || !type || !category) {
    alert("Please fill all fields");
    return;
  }

  await addTransaction({
    title,
    amount,
    type,
    category,
    date: new Date()
  });

  // Clear inputs
  document.getElementById("amountInput").value = "";
  document.getElementById("titleInput").value = "";
  document.getElementById("typeSelect").value = "expense";
  document.getElementById("categorySelect").value = "Food";

  closePanelFn();
  await loadTransactions();
});

// Init
document.addEventListener("DOMContentLoaded", loadTransactions);
