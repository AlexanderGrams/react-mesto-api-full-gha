const router = require('express').Router();
const { errors } = require('celebrate');

const NotFoundError = require('../errors/NotFoundError');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const signinAndSignupRoutes = require('./signinAndSignup');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');

// Сбор логов запросов
router.use(requestLogger);

// Все доступные роуты страницы без авторизации
router.use('/', signinAndSignupRoutes);

// Проверка авторизации
router.use(auth);

// Все доступные роуты страницы с авторизацией
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

// обработка ошибки, если введен несуществующий URL
router.use((req, res, next) => next(new NotFoundError('Такого URL не существует')));

// Сбор логов ошибок
router.use(errorLogger);

router.use(errors());
router.use(errorHandler);

module.exports = router;
