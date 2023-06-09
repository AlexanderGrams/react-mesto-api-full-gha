const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const signinAndSignupRoutes = require('./signinAndSignup');
const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Все доступные роуты страницы без авторизации
router.use('/', signinAndSignupRoutes);

// Проверка авторизации
router.use(auth);

// Все доступные роуты страницы с авторизацией
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

// обработка ошибки, если введен несуществующий URL
router.use((req, res, next) => next(new NotFoundError('Такого URL не существует')));

module.exports = router;
