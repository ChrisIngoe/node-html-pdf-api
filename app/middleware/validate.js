const Joi = require('joi');

exports.validateHtmlFileArray = function (req, res, next) {
  const files = req.body;
  const schema = Joi.array()
    .items(
      Joi.object({
        fileName: Joi.string()
          .pattern(/^[\w,\s-]+\.html$/)
          .min(1)
          .max(255)
          .required(),
        data: Joi.string().base64().min(100).max(100000).required(),
      })
    )
    .required();
  const { error, value } = schema.validate(files);
  if (error) {
    console.warn(error);
    return res.status(400).send('Bad Request');
  } else {
    next();
  }
};
