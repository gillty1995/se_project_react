import { useContext } from "react";

import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  items,
  handleCardClick,
  handleAddClick,
  handleDeleteItem,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = items.filter((item) => item.owner === currentUser?._id);

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
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={() => handleCardClick(item)}
              onDelete={() => handleDeleteItem(item)}
            />
          ))
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
