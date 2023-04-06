const jsonwebtoken = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = {
    _id: payload._id,
  };
  return next();
};

module.exports = auth;
