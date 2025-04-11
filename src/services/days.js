import { SERVER_URL } from "./serverAPI.js";

const BASE_URL = `${SERVER_URL}/days`;

export async function getDays() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch days");
    }

    const days = await res.json();

    const today = new Date().toDateString();
    const hasToday = days.some((day) => {
      const dayDate = new Date(day.date).toDateString();
      return dayDate === today;
    });

    if (!hasToday) {
      const createdDay = await createDay();
      return [...days, createdDay];
    }

    return days;
  } catch (err) {
    console.error("Error fetching or creating days:", err);
    return [];
  }
}

export async function createDay(date = new Date()) {
  const token = localStorage.getItem("token");

  const payload = {
    date: date.toISOString(),
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create day");
  }

  return res.json();
}

export async function deleteDay(dayId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${dayId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete day");
  }

  return true; // or return await res.json() if your API returns something
}
