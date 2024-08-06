export const registUser = async ({ email, password, name, avatar }) => {
  const res = await fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  if (!res.ok) {
    throw new Error("Registration failed");
  }
  return res.json();
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.json();
};
