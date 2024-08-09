import "./ItemCard.css";
import likeBtn from "../../assets/like-btn.svg";

function ItemCard({ item, onCardClick, currentUser, onCardLike }) {
  if (!item || !item.likes || !currentUser) {
    return <div>Error: Missing data</div>;
  }

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    const isLiked = item.likes.some((id) => id === currentUser._id);
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__name-box">
          <h2 className="card__name">{item.name}</h2>
        </div>
        <button
          type="button"
          className={itemLikeButtonClassName}
          style={{ backgroundImage: `url(${likeBtn})` }}
          onClick={handleLike}
        ></button>
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
