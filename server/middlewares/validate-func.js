
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        next();
    } catch (err) {
        const message = err.errors[0].message;
        const error = {
            status: 400,
            message: message,
        }

        next(error);
    }
}

module.exports = validate;