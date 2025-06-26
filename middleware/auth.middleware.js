import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protect = async (req, res, next) => {
    let token;

    //1. check if token is present in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //Extract token (Bearer tokenvalue)
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Fetch user from DB, exclude password
            req.user = await User.findById(decoded.id).select('-password');
            //pass control to next middleware/route
            next();
        }catch (error){
            console.error('Auth error:', error.message);
            return res.status(401).json({message:'Not authorized, invalid token'});
        }
    }
    //if no token
    if (!token){
        return res.status(401).json({message:'Not authorized,no token'});
    }
}