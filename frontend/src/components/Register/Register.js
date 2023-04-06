import { Link } from 'react-router-dom';
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Register({onRegister}) {
  const {values, resetForm, handleChange, errors, isValid} = useFormAndValidation();

  function handleSubmit(e, setButtonLoading) {
    e.preventDefault();
    onRegister(values, resetForm, setButtonLoading)
  }

  return (
    <main className="main">
      <section className="authorization">
        <h1 className="authorization__title">Регистрация</h1>
        <LoginAndRegisterForm isValid={!isValid} name={'register'} onSubmit={handleSubmit} buttonText="Зарегистрироваться">
          <fieldset className="authorization__inputs">
            <input id="name-emailUser" className={errors.emailUser ? "authorization__item authorization__item_tupe_error" : "authorization__item"} type="email" name="emailUser" required minLength="2" maxLength="40" placeholder="Email" value={values.emailUser || ''} onChange={handleChange} autoComplete = "new-email"/>
            <span id="name-emailUser-error" className="authorization__text-error">{errors.emailUser}</span>
            <input id="name-password" className={errors.password ? "authorization__item authorization__item_tupe_error" : "authorization__item"} type="password" name="password" required minLength="2" maxLength="200" placeholder="Пароль" value={values.password || ''} onChange={handleChange} autoComplete = "new-password"/>
            <span id="name-password-error" className="authorization__text-error">{errors.password}</span>
          </fieldset>
        </LoginAndRegisterForm>
        <Link to="/sign-in" className="authorization__link">
          Уже зарегистрированы? Войти
        </Link>
      </section>
    </main>
  );
}

export default Register;
