import jwt from "jsonwebtoken";

export const ensureAuthentication = (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res
            .status(403)
            .json({ message: "Unauthorized, user can't access this page, please send a token" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ success: false, message: "Unauthorized token" })
        }
        req.user = decoded;
        next();

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Unauthorized, token is not verified" })
    }
}