import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./index.js";

declare module "express" {
    interface Request {
        userId?: string;
        adminId?: string;
    }
}

const authMiddleware = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        if ("userId" in decoded) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({ message: "Invalid token" });
        }
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

const adminMiddleware = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized access. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        if (decoded.adminId && decoded.companyId) {
            req.adminId = decoded.adminId;
            req.companyId = decoded.companyId;
            return next();
        } else {
            return res.status(403).json({ message: "Invalid token payload" });
        }
        
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export { authMiddleware, adminMiddleware };