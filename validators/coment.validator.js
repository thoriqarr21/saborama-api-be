const Joi = require('joi');

const comentSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    komentar: Joi.string().required(),
});

const validateComent = (req, res, next) => {
    const { error } = comentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
    }
    next();
};

module.exports = { validateComent };
