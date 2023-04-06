const jsonwebtoken = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace(bearer, '');

  let payload;
  try {
    payload = jsonwebtoken.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = {
    _id: payload._id,
  };
  return next();
};

module.exports = auth;
