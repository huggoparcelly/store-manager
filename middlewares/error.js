// retirado da atividade do bloco 27

module.exports = (err, req, res, _next) => {
  if (err.isJoi) {
    return res.status(400)
      .json({
        err: {
          message: err.details[0].message,
          code: 'invalid_data',
        } });
  }

  if (err.code) {
    const statusByErrorCode = { notFound: 404, alreadyExists: 409 };
    
    const status = statusByErrorCode[err.code] || 500;
    
    res.status(status).json(err);
  }

  console.error(err);
  res.status(500)
    .json({ err: {
      message: 'Internal server error',
      code: 'internal' } });
};