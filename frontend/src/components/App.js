import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./Header/Header"
import Main from "./Main/Main";
import Footer from "./Footer/Footer"
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup"
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentCardContext} from '../contexts/CurrentCardContext';
import loading from "../images/loading.gif";
import DeleteCardQuestionPopup from './DeleteCardQuestionPopup/DeleteCardQuestionPopup';
import Register from "./Register/Register"
import Login from "./Login/Login"
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute"
import InfoTooltip from './InfoTooltip/InfoTooltip';
import { getContent, authorize, register } from "../utils/auth"

function App() {
  //состояние попапа аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //состояние попапа добавления новой карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //состояние попапа редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //состояние попапа удаления карточки
  const [isDeleteCardQuestionPopupOpen, setIsDeleteCardQuestionPopupOpen] = useState(false);
  //состояние попапа полноразмерной картинки
  const [selectedCard, setSelectedCard] = useState({});
  //состояние попапа ответа регистрации
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  //данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  //данные карточек
  const [currentCards, setCurrentCards] = useState([]);
  //анимация загрузки страницы
  const [loadingBoolean, setLoadingBoolean] = useState(false);

  const [cardToBeDeleted, setCardToBeDeleted] = useState({});
  //авторизация пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  //состояние регистрации
  const [message, setMessage] = useState({
    status: false,
    text: "",
  })
  //email авторизированного пользователя
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  function handleLogin(values, resetForm, setButtonLoading) {
    setLoadingBoolean(false);

    const {emailUser, password} = values
    authorize(emailUser, password)
      .then((res)=>{
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate('/', {replace: true})
        setUserEmail(emailUser)
      })
      .catch((res) => {
        if(res === 'Ошибка: 401'){
          setMessage({
            status: false,
            text: "Аккаунт не зарегистрирован",
          });
        }else{
          setMessage({
            status: false,
            text: res,
          });
        }
        setLoadingBoolean(true);
        setOpenInfoTooltip(true);
      })
      .finally(()=>{
        resetForm()
        setButtonLoading(false)
      })
  }

  function handleRegister(values, resetForm, setButtonLoading){
    const {emailUser, password} = values
    register(emailUser, password)
      .then(()=>{
        setMessage({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate('/sign-in', {replace: true})
      })
      .catch(() => {
        setMessage({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(()=>{
        resetForm()
        setButtonLoading(false)
        setOpenInfoTooltip(true)
      })
  }

  useEffect(()=>{
    tokenCheck();
  }, [])

  function tokenCheck(){
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", {replace: true});
        })
        .catch((err) => {
          console.log(err);
          setLoadingBoolean(true);
        })
    }else{
      setLoadingBoolean(true);
    }
  }

  useEffect(() => {
    if(loggedIn){
      Promise.all([
        api.getInfoUser(),
        api.getInitialCards()
      ])
        .then(([info, initialCards]) => {
          setCurrentUser(info);
          setCurrentCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
          setLoadingBoolean(true);
        });
    }
  }, [loggedIn])

  function handleCardLike(card) {
    //проверяем, есть ли лайк на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCurrentCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser({nameUser, activity, resetForm}, setButtonLoading){
    api.giveInfoUser(nameUser, activity)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setButtonLoading(false)
      });
  }

  function handleAddCrad({values, resetForm}, setButtonLoading){
    api.giveCard(values.cardDescription, values.linkImg)
      .then(newCard => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setButtonLoading(false)
      });
  }

  function handleUpdateAvatar({avatar, resetForm}, setButtonLoading){
    api.giveAvatar(avatar)
      .then(userInfo => {
        setCurrentUser(userInfo);
        closeAllPopups();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setButtonLoading(false)
      });
  }

  //открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleCardDeletClick(card){
    setIsDeleteCardQuestionPopupOpen(!isDeleteCardQuestionPopupOpen);
    setCardToBeDeleted(card);
  }

  function deleteCard(card, setButtonLoading) {
    api.deletCard(card._id)
      .then(()=>{
        setCurrentCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setButtonLoading(false)
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  //закрытие всех попапов
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardQuestionPopupOpen(false);
    setSelectedCard({});
    setOpenInfoTooltip(false)
  };

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
    setUserEmail('');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardContext.Provider value={currentCards}>
          <Header userEmail={userEmail} signOut={signOut} />
          {loadingBoolean ?
            <Routes>
              <Route path="/sign-up" element={<Register onRegister={handleRegister} setMessage={setMessage} setOpenInfoTooltip={setOpenInfoTooltip}/>}/>
              <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
              <Route path="/" element={
                <ProtectedRouteElement component={Main} loggedIn={loggedIn} onCardLike={handleCardLike} onCardDelet={handleCardDeletClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
              }/>
            </Routes>
            :
            <div className='loading-data'>
              <img className='loading-data__img' src={loading} alt='анимация загрузки'/>
            </div>
          }
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddCrad={handleAddCrad} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <DeleteCardQuestionPopup onDeleteCard={deleteCard} card={cardToBeDeleted} isOpen={isDeleteCardQuestionPopupOpen} onClose={closeAllPopups}/>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <InfoTooltip isOpen={isOpenInfoTooltip} onClose={closeAllPopups} message={message}/>
        </CurrentCardContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
