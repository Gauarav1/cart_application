const jToken = require("jsonwebtoken");

const jwtToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            let t = {
                msg: "Unauthorized User",
                status: failed,
                code: 400
            }
            return res.send(t);
        }
        const data = jToken.decode(token);
        if (data) {
            req.user = data;
            next();
        }
        else {
            let t = {
                msg: "Error in Decoding Token",
                status: failed,
                code: 400
            }
            return res.send(t);
        }
    }
    catch (err) {
        res.send(err);
    }
}

module.exports = {
    jwtToken
}