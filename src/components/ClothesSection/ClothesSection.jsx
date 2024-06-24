import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  items,
  handleCardClick,
  handleAddClick,
  handleDeleteItem,
}) {
  console.log("Items in ClothesSection:", items);
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
        {items && items.length > 0 ? (
          items.map((item) => (
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
