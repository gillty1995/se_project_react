import "./ItemCard.css";

function ItemCard({ item, onCardClick, currentUser, onCardLike }) {
  if (!item || !item.likes) {
    return <li className="card">Error: Missing item data</li>;
  }

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (currentUser) {
      const isLiked = item.likes.includes(currentUser._id);
      onCardLike({ id: item._id, isLiked });
    }
  };

  const isLiked = currentUser ? item.likes.includes(currentUser._id) : false;
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__name-box">
          <h2 className="card__name">{item.name}</h2>
        </div>
        {currentUser && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name || "Item Image"}
      />
    </li>
  );
}

export default ItemCard;
