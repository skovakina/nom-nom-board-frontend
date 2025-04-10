import { SERVER_URL } from "./serverAPI.js";

const BASE_URL = `${SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json(); 

    if (!res.ok) {
      console.error("Error data:", data); 
      throw new Error( data?.err || "Something went wrong"); 
      
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
};



const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export { signUp, signIn };
