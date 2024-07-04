const Joi = require('joi');

const daerahSchema = Joi.object({
    name: Joi.string().required(),
    deskripsi: Joi.string().required(),
    pictureId: Joi.string().required(),
});

const validateDaerah = (req, res, next) => {
    const { error } = daerahSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
    }
    next();
};

module.exports = { validateDaerah };
