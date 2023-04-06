const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const InaccurateDataError = require('../errors/InaccurateDataError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/userSchema');
const { JWT_SECRET } = require('../config');

// Получить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

function searchingUser(res, next, id) {
  return User.findById(id)
    .then((user) => {
      if (!(user)) {
        throw next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
}

// Получить пользователя
const getUser = (req, res, next) => {
  const { userId } = req.params;
  return searchingUser(res, next, userId);
};

// Получить информацию об авторизированном пользователе
const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  return searchingUser(res, next, _id);
};

// Создать нового пользователя
const createUser = (req, res, next) => {
  // Получить необходимые данные из тела запроса
  const {
    name, about, avatar, email, password,
  } = req.body;

  // Хешировать пороль
  bcrypt.hash(password, 10)
    // Создать пользователся
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким электронным адресом уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

function updateInfo(res, next, id, propertiesObj) {
  User.findByIdAndUpdate(id, propertiesObj, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new InaccurateDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
}

// Внести изменения в информацию профиля
const patchProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  return updateInfo(res, next, userId, { name, about });
};

// Изменить аватар
const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  return updateInfo(res, next, userId, { avatar });
};

// Авторизация
const login = (req, res, next) => {
  // Получить необходимые данные из тела запроса
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => next(new UnauthorizedError('Неправильные почта или пароль')))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (matched) {
          return user;
        }
        throw next(new UnauthorizedError('Неправильные почта или пароль'));
      }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', jwt, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ _id: user._id });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  login,
  createUser,
  patchProfile,
  patchAvatar,
};
