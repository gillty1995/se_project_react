import { processServerRequest } from "./utils";

const baseUrl = "http://localhost:3001";

export const registUser = async ({ email, password, name, avatar }) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return processServerRequest(res);
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return processServerRequest(res);
};

export const checkToken = async (token) => {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return processServerRequest(res);
};
