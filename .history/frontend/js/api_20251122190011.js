// api.js - Handles backend API calls for transactions

const API_URL = "http://localhost:5000/api/transactions";

// ===== Fetch all transactions =====
export async function fetchTransactions() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

// ===== Add a new transaction =====
export async function addTransaction(data) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
}

// ===== Delete Transaction =====
export async function deleteTransaction(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
}
