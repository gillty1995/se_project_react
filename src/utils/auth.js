import { processServerRequest } from "./utils";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.fr.to"
    : "http://localhost:3001";

export const registUser = async ({ email, password, name, avatar }) => {
  try {
    const res = await fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, avatar, email, password }),
    });
    return await processServerRequest(res);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await processServerRequest(res);
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const res = await fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await processServerRequest(res);
  } catch (error) {
    console.error("Token check error:", error);
    throw error;
  }
};
