// ===== IMPORT API FUNCTIONS =====
import { fetchTransactions, addTransaction, deleteTransaction } from "./api.js";

// ===== DOM ELEMENTS =====
const tableBody = document.getElementById("tableBody");
const cardList = document.getElementById("cardList");
const addBtn = document.getElementById("addBtn");
const addPanel = document.getElementById("addPanel");
const closePanel = document.getElementById("closePanel");
const saveTransactionBtn = document.getElementById("saveTransaction");

let selectedCategory = ""; // store selected category from grid

// ===== OPEN & CLOSE PANEL =====
addBtn.addEventListener("click", () => {
  addPanel.classList.remove("translate-x-full");
  document.body.style.overflow = "hidden";
});

closePanel.addEventListener("click", () => {
  addPanel.classList.add("translate-x-full");
  document.body.style.overflow = "auto";
});

// ===== CATEGORY SELECTION =====
const catButtons = document.querySelectorAll(".cat-btn");
catButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.cat;

    catButtons.forEach(b => b.classList.remove("bg-indigo-600", "text-white"));
    btn.classList.add("bg-indigo-600", "text-white");
  });
});

// ===== RENDER TRANSACTIONS =====
async function loadTransactions() {
  const transactions = await fetchTransactions();

  tableBody.innerHTML = "";
  cardList.innerHTML = "";

  transactions.forEach(t => {
    // ===== TABLE ROW FOR DESKTOP =====
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-4">${t.title}</td>
      <td class="p-4">${t.category}</td>
      <td class="p-4">${t.type}</td>
      <td class="p-4 font-bold ${t.type === "expense" ? "text-red-500" : "text-green-600"}">₹${t.amount}</td>
      <td class="p-4">${new Date(t.date).toLocaleDateString()}</td>
      <td class="p-4">
        <button class="deleteBtn text-red-600 font-bold" data-id="${t._id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);

    // ===== CARD VIEW FOR MOBILE =====
    const card = document.createElement("div");
    card.className = "p-4 bg-white shadow rounded-xl flex justify-between items-center";
    card.innerHTML = `
      <div>
        <h3 class="font-bold">${t.title}</h3>
        <p class="text-sm text-gray-600">${t.category} • ${new Date(t.date).toLocaleDateString()}</p>
      </div>
      <div class="text-right">
        <p class="font-bold ${t.type === "expense" ? "text-red-500" : "text-green-600"}">₹${t.amount}</p>
        <button class="deleteBtn text-xs text-red-600 font-bold mt-1" data-id="${t._id}">Remove</button>
      </div>
    `;
    cardList.appendChild(card);
  });

  // ===== DELETE BUTTON ACTION =====
  document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const id = e.target.dataset.id;
    await deleteTransaction(id);
    loadTransactions();  // instantly updates UI
  }
});

}

// ===== SAVE NEW TRANSACTION =====
saveTransactionBtn.addEventListener("click", async () => {
  const amount = document.getElementById("amountInput").value;
  const title = document.getElementById("titleInput").value;
  const type = document.getElementById("typeSelect").value;
  const recurring = document.getElementById("recurringCheck").checked;

  if (!selectedCategory || !title || !amount) {
    alert("Please fill all fields.");
    return;
  }

  await addTransaction({
    title,
    amount: Number(amount),
    type,
    category: selectedCategory,
    date: new Date(),
    recurring
  });

  addPanel.classList.add("translate-x-full");
  document.body.style.overflow = "auto";

  loadTransactions();
});

// ===== START APP =====
loadTransactions();
