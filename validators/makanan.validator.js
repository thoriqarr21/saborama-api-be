const Joi = require('joi');

const makananSchema = Joi.object({
    name: Joi.string().required(),
    publisher: Joi.string().required(),
    description: Joi.string().required(),
    tingkatSulit: Joi.string().required(),
    waktu: Joi.string().required(),
    rating: Joi.string().required(),
    image: Joi.string().required(),
    bahan: Joi.string().required(),
    daerahId: Joi.string().required(),
});

const validateMakanan = (req, res, next) => {
    const { error } = makananSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
    }
    next();
};

module.exports = { validateMakanan };
