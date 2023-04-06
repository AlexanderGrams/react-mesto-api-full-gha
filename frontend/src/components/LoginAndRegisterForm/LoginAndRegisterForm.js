import React, { useState} from 'react';
import imgLoading from "../../images/loading-btn_black.gif";

function LoginAndRegisterForm({name, isValid, children, onSubmit, buttonText}) {

  const [buttonLoading, setButtonLoading] = useState(false);


  function handlerOnSubmit(e){
    onSubmit(e, setButtonLoading);
    setButtonLoading(true)
  }

  return (
    <form className="authorization__form-admin" name={name} noValidate onSubmit={handlerOnSubmit}>
      {children}
      {buttonLoading ?
        <div className='loading-btn loading-btn_theme_black'>
          <img className='loading-btn__img' src={imgLoading} alt='анимация загрузки' />
        </div>
        :
        <input  disabled={isValid} className={isValid ? "authorization__button authorization__button_disabled" : "authorization__button"} type="submit" value={buttonText} />
      }
    </form>
  );
}

export default LoginAndRegisterForm;
