import React, {useEffect} from 'react';

function ImagePopup({card, onClose}) {
  useEffect(() => {
    if (Object.keys(card).length !== 0) {
      document.addEventListener('keydown', handleEscClose)
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [card])

  function handleEscClose(evt){
    if (evt.key === 'Escape') {
      onClose();
    };
  };

  function mauseDawnClose(evt){
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    };
    if (evt.target.classList.contains('popup__close')) {
      onClose();
    };
  }

  return (
    <div className={`popup popup_animation popup_type_zoom-img ${Object.keys(card).length !== 0 ? "popup_opened" : ""}`} onMouseDown={mauseDawnClose}>
      <div className="popup__container popup__container_type_zoom-img">
        <img className="popup__image" src={`${card.link}`} alt={`изображение: ${card.name}`} />
        <h2 className="popup__signature">{card.name}</h2>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
