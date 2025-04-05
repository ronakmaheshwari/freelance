import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./index.js";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if ("userId" in decoded) {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(403).json({ message: "Invalid token" });
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
const adminMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized access. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.adminId && decoded.companyId) {
            req.adminId = decoded.adminId;
            req.companyId = decoded.companyId;
            return next();
        }
        else {
            return res.status(403).json({ message: "Invalid token payload" });
        }
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
export { authMiddleware, adminMiddleware };
