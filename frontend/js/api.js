// api.js - central API helper

export const API_BASE_URL = "http://localhost:5000/api";

// GET /api/transactions
export async function fetchTransactions() {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return [];
  }
}

// GET /api/transactions/stats
export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/stats`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching stats:", err);
    return { income: 0, expense: 0, balance: 0 };
  }
}

// POST /api/transactions
export async function addTransaction(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Error adding transaction:", err);
  }
}

// DELETE /api/transactions/:id
export async function deleteTransaction(id) {
  try {
    await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error("Error deleting transaction:", err);
  }
}
