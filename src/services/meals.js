import { SERVER_URL } from "./serverAPI.js";

const BASE_URL = `${SERVER_URL}/meals`;

// GET all meals
export async function getMeals() {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch meals");
  }

  return res.json();
}

// POST create a new meal
export async function createMeal({ title, note }) {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, note }),
  });

  if (!res.ok) {
    throw new Error("Failed to create meal");
  }

  return res.json();
}

// PUT update an existing meal
export async function updateMeal(mealId, updates) {
  console.log("updates", updates);
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${mealId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Failed to update meal");
  }

  return res.json();
}

// DELETE remove a meal
export async function deleteMeal(mealId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${mealId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete meal");
  }

  return true;
}

// GET single meal by ID (optional)
export async function getMealById(mealId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${mealId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch meal");
  }

  return res.json();
}
