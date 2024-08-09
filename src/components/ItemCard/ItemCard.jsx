import "./ItemCard.css";

import likeBtn from "../../assets/like-btn.svg";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__info">
        <div className="card__name-box">
          <h2 className="card__name">{item.name}</h2>
        </div>
        <button
          type="button"
          className="card__like-button"
          style={{ backgroundImage: `url(${likeBtn})` }}
        ></button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
