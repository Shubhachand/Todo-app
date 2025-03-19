import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!process.env.JWT_SECRET) {
            console.error("JWT Secret is missing!");
            return res.status(500).json({ msg: "Internal Server Error: JWT Secret is missing" });
        }
        
        if(!token) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized access" });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode) {
            return res.status(401).json({
                success: false,
                msg: "Invalid Token" });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ msg: "Internal Server Error and probably user not authenticated" });
        
    }
}
export default isAuthenticated;