import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Login({onLogin}) {
  const {values, handleChange, resetForm, errors, isValid} = useFormAndValidation()

  function handleSubmit(e, setButtonLoading) {
    e.preventDefault();
    onLogin(values, resetForm, setButtonLoading);
  }

  return (
    <main className="main">
      <section className="authorization">
        <h1 className="authorization__title">Вход</h1>
        <LoginAndRegisterForm isValid={!isValid} name={'log-in'} onSubmit={handleSubmit} buttonText="Войти">
          <fieldset className="authorization__inputs">
            <input id="name-emailUser" className={errors.emailUser ? "authorization__item authorization__item_tupe_error" : "authorization__item"} type="email" name="emailUser" required minLength="2" maxLength="40" placeholder="Email" value={values.emailUser || ''} onChange={handleChange} autoComplete = "new-email"/>
            <span id="name-emailUser-error" className="authorization__text-error">{errors.emailUser}</span>
            <input id="name-password" className={errors.password ? "authorization__item authorization__item_tupe_error" : "authorization__item"} type="password" name="password" required minLength="2" maxLength="200" placeholder="Пароль" value={values.password || ''} onChange={handleChange} autoComplete = "new-password"/>
            <span id="name-password-error" className="authorization__text-error">{errors.password}</span>
          </fieldset>
        </LoginAndRegisterForm>
      </section>
    </main>
  );
}

export default Login;
