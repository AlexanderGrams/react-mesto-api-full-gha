const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();

// Подключение к базе данных
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

// Парсинг приходящих данных со стороны клиента
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Парсинг кук
app.use(cookieParser());

// Роутинг
app.use(routes);

app.listen(PORT, () => {
  console.log(`Сервер запустился!!! Работает на порту - ${PORT}`);
});
