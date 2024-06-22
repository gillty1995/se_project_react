import React, { useState, useEffect } from "react";
import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";
import AddItemModal from "../AddItemModal/AddItemModal";

import { getItems, addItem, deleteItem } from "../../utils/api";

function ClothesSection({ handleCardClick, card }) {
  const [items, setItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    getItems()
      .then((fetchedItems) => {
        setItems(fetchedItems);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteItem = (card) => {
    const itemId = card._id;

    deleteItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItem = (item) => {
    console.log("Adding item:", item);
    addItem(item)
      .then((newItem) => {
        console.log("New item from API:", newItem);
        setItems((prevItems) => [newItem, ...prevItems]); // Prepend new item
        closeActiveModal();
      })
      .catch(console.error);
  };

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onDelete={handleDeleteItem}
          />
        ))}
      </ul>
      {activeModal === "add-garment" && (
        <AddItemModal
          closeActiveModal={closeActiveModal}
          isOpen={true}
          onAddItem={handleAddItem}
        />
      )}
    </div>
  );
}

export default ClothesSection;
