const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes');
const { PORT, DB_ADDRESS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Подключение к базе данных
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(cors());

// Парсинг приходящих данных со стороны клиента
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Сбор логов запросов
app.use(requestLogger);

// Роутинг
app.use(routes);

// Сбор логов ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запустился!!! Работает на порту - ${PORT}`);
});
