const Card = require('../models/cardSchema');
const InaccurateDataError = require('../errors/InaccurateDataError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

//  Получить все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

// Создать карточку
const createCard = (req, res, next) => {
  // Получить id пользователя из cocke
  const owner = req.user._id;

  // Получить необходимые данные из тела запроса
  const { name, link } = req.body;

  // Создать новую крточку в базе данных
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return (err);
    });
};

// Удалить карточку
const deleteCard = (req, res, next) => {
  // Получить id карточки из URL
  const { cardId } = req.params;

  // Получить id пользователя из cocke
  const userId = req.user._id;

  // Найти и удалить карточку по id в базе данных
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw next(new NotFoundError('Карточка не найдена'));
      }
      if (userId !== String(card.owner)) {
        throw next(new ForbiddenError('Нет прав для удаления этой карточки'));
      }
      return card.deleteOne();
    })
    .then((deletedСard) => {
      res.send({ deletedСard });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

function updateLikeCard(res, next, id, propertiesObj) {
  Card.findByIdAndUpdate(
    id,
    propertiesObj,
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw next(new NotFoundError('Карточка не найдена'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
}

// Поставить лайк карточке
const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  // Добавить в массив пользователей лайкнувших карточку унакального пользователя
  updateLikeCard(res, next, cardId, { $addToSet: { likes: userId } });
};

// Убрать лайк с карточки
const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  // Удалить пользователя из массива унакальных пользователей лайкнувших карточку
  updateLikeCard(res, next, cardId, { $pull: { likes: userId } });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
