import { useContext } from "react";

import "./ItemModal.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "modal__delete_visible" : "modal__delete_hidden"
  }`;

  const handleDelete = () => {
    onDelete(card);
    onClose();
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-white"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button className={itemDeleteButtonClassName} onClick={handleDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
