import logo from "../../images/logo.svg";
import {Route, Link, Routes } from 'react-router-dom';
import { useState } from "react"

function Header({userEmail, signOut, openPopupBurger}){
  const [isActiveBurger, setIsActiveBurger] = useState(false);

  function openPopupBurger(){
    setIsActiveBurger(!isActiveBurger)
  }

  return (
    <header className={isActiveBurger ? "header header_type_active" : "header"}>
      <img className="header__logo" src={logo} alt="логотип Место" />
      <Routes>
        <Route path="/sign-up" element={
          <Link to={"/sign-in"} className="header__navLink">Войти</Link>}/>
        <Route path="/sign-in" element={
          <Link to={"/sign-up"} className="header__navLink">Регистрация</Link>}/>
        <Route path="/" element={
          <>
          <div className={isActiveBurger ? "header__userElements header__userElements_tupe_active" : "header__userElements"}>
            <p className='header__email'>{userEmail}</p>
            <button onClick={signOut} className="header__logout">Выйти</button>
          </div>
          <button className={isActiveBurger ? " header__burger_active header__burger" : "header__burger"} onClick={openPopupBurger}>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </button>
          </>
        }/>
      </Routes>
    </header>
  )
}

export default Header;
