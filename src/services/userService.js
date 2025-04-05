import { BASE_URL } from "./serverAPI.js";

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

export { index };
