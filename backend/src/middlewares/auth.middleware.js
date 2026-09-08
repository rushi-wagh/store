import {verifyToken} from "../utils/token.js";
import {prisma} from "../db/db.js";

export const isLoggedIn = async(req,res,next) => {
    try {
        const token = req.cookies.AccessToken;
        const decoded = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
        });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
}

export const isAdmin = async(req,res,next) => {
    try {
        const user = req.user;
        if(user.role !== "SYSTEM_ADMINISTRATOR") {
            return res.status(403).json({
                message: "You are not allowed to access this resource   ",
            }
        )
    }
    next();
} catch (error) {
    
    return res.status(500).json({
        message: "Internal server error",
    });
}
}
