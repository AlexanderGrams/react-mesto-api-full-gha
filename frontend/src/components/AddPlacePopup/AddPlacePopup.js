import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddPlacePopup({isOpen, onClose, onAddCrad}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

  function handleAddPlaceSubmit(e, setButtonLoading){
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddCrad({
      values: values,
      resetForm: resetForm,
    },
    setButtonLoading
    );
  }

  return (
    <PopupWithForm resetForm={resetForm} isValid={!isValid} onSubmit={handleAddPlaceSubmit} name={'add-card'} title={'Новое место'} isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
      <fieldset className="popup__editing-profille">
        <input value={values.cardDescription || ''} id="title-input" className="popup__item popup__item_type_title" type="text" name="cardDescription" required minLength="2" maxLength="30" placeholder="Название" onChange={handleChange} />
        <span id="title-input-error" className="popup__text-error">{errors.cardDescription}</span>
        <input value={values.linkImg || ''} id="link-input" className="popup__item popup__item_type_link" type="url" name="linkImg" required placeholder="Ссылка на картинку" onChange={handleChange} />
        <span id="link-input-error" className="popup__text-error">{errors.linkImg}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
