import { processServerRequest } from "./utils";

const baseUrl = "http://localhost:3001";

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
