const authenticate = (req, res, next) => {
  if (req.session.isPopulated) {
    return next();
  }

  res.sendStatus(403);
};

module.exports = { authenticate };
