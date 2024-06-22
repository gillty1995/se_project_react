const baseUrl = "http://localhost:3001";

function processServerRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return res
    .text()
    .then((text) => Promise.reject(`Error: ${res.status} - ${text}`));
}

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return processServerRequest(res);
  });
}

function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => processServerRequest(res));
}

function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then((res) => processServerRequest(res));
}

export { getItems, addItem, deleteItem };
