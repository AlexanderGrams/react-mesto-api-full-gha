import React, {  } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function DeleteCardQuestionPopup({onDeleteCard, card, isOpen, onClose}) {

  function handleSubmit(e, setButtonLoading) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onDeleteCard(card, setButtonLoading)
  }

  return (
    <PopupWithForm name={'question-remove'} onSubmit={handleSubmit} title={'Вы уверены?'} isOpen={isOpen} onClose={onClose} buttonText="Да" />
  );
}

export default DeleteCardQuestionPopup;
