import React, { useRef, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [inputValidationMessage, setInputValidationMessage] = useState('');

  const inputRef = useRef()

  function handleSubmit(e, setButtonLoading) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
      resetForm: resetForm,
    },
    setButtonLoading
    );
  }

  function handleInput(e){
    if(e.target.validity.valid){
      setSubmitDisabled(false);
      setInputValidationMessage('')
    }else{
      setSubmitDisabled(true);
      setInputValidationMessage(e.target.validationMessage);
    }
  }

  function resetForm(){
    setSubmitDisabled(true);
    setInputValidationMessage('');
    inputRef.current.value = '';
  }

  return (
    <PopupWithForm resetForm={resetForm} onSubmit={handleSubmit} isValid={submitDisabled} name={'update-avatar'} title={'Обновить аватар'} isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
      <fieldset className="popup__editing-profille">
        <input ref={inputRef} id="link-avatar-input" className="popup__item popup__item_type_link-avatar" type="url" name="link" onInput={handleInput} required placeholder="Ссылка на картинку" />
        <span id="link-avatar-input-error" className="popup__text-error">{inputValidationMessage}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
