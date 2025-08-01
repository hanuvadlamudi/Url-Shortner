import { verifyToken } from "../utils/helper.util";

export const authorizeMiddleware = (req,res,next) =>{
    const token = req.cookie.accesstoken;

    if(!token){
        return res.status(401).json({message : "unauthorized"});
    }

    
}