const { body, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    console.log("\n\n in validation middleware")
    let email = req.body.email;
    let password = req.email.password;
    body(email).isEmail();
    body(password).isLength({ min: 4 });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }

}