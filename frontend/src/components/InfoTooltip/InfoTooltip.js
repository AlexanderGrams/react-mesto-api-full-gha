import React, {useEffect} from 'react';
import register_ok from '../../images/register_ok.svg'
import register_arror from '../../images/register_arror.svg'

function InfoTooltip({isOpen, onClose, message}) {

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose)
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [isOpen])

  function handleEscClose(evt){
    if (evt.key === 'Escape') {
      onClose();
    }
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
    <div className={`popup popup_animation ${isOpen ? "popup_opened" : ""}`} onMouseDown={mauseDawnClose}>
      <div className="popup__container popup__infoTooltip">
        <img src={message.status ? register_ok : register_arror} className="popup__response-image" alt="регистрация прошла успешно"></img>
        <h2 className="popup__title popup__title_type_infoTooltip">
          {message.text}
        </h2>
        <button
            className="popup__close"
            aria-label="закрыть"
            type="button"
            onClick={onClose}
          />
      </div>
    </div>
  );
}

export default InfoTooltip;
