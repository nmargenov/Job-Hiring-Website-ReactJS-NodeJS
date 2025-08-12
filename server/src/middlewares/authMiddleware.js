const { verify } = require("../utils/jwt");
const { MESSAGES } = require("../utils/messages/Messages");

const SECRET = process.env.SECRET;
const AUTH_COOKIE = process.env.AUTH_COOKIE;

exports.auth = async (req, res, next) => {
    const token = req.headers[AUTH_COOKIE];
    if (token) {
        try {
            const decodedToken = await verify(token, SECRET);

            req.user = decodedToken;
            res.isLogged = true;
            res.locals.isLogged = true;
            res.locals.user = decodedToken;

            next();
        } catch (err) {
            res.status(409).send({ message: MESSAGES.invalidToken });
        }

    } else {
        next();
    }
};

exports.mustBeAuth = (req, res, next) => {
    try {
        if (!req.user) {
            throw new Error(MESSAGES.unauthorized);
        } else {
            next();
        }
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
}

exports.mustBeGuest = (req, res, next) => {
    try {
        if (req.user) {
            throw new Error(MESSAGES.forbidden);
        } else {
            next();
        }
    } catch (err) {
        res.status(403).send({ message: err.message });
    }
}