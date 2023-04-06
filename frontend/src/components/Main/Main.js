import React, {useContext} from 'react';
import Card from "../Card/Card.js";
import {CurrentUserContext} from "../../contexts/CurrentUserContext.js"
import {CurrentCardContext} from "../../contexts/CurrentCardContext.js"

function Main({onCardLike, onCardDelet, onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const currentUserData = useContext(CurrentUserContext);
  const currentCardsData = useContext(CurrentCardContext);

  return (
    <main className="main">
      <section className="profile" aria-label="Секция с информацией профиля">
        <button className="profile__btn-avatar" onClick={onEditAvatar}>
          <img className="profile__avatar-image" src={currentUserData.avatar} alt="Аватар" />
          <div className="profile__avatar"></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUserData.name}</h1>
          <button className="profile__info-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUserData.about}</p>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery" aria-label="Секция с картинками профиля">
        <ul className="gallery__cards">
          {
            currentCardsData.map(card => {
              return (
                <Card onCardLike={onCardLike} onCardDelet={onCardDelet} card={card} onCardClick={onCardClick} key={card._id}/>
              )
            })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
