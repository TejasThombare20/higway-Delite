import {NextFunction, Request , Response , }  from "express"
import jwt from 'jsonwebtoken';

const JWT_SECRET = "lAGWjVG0BmK3yCIhL7pTA9XG8SqLEf5fiTsFqmpLyuk=";
/** auth middleware */
export default async function Auth(req:any, res:Response, next:NextFunction){
    try {
        
        // access authorize header to validate request

        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}


export function localVariables(req :any, res :any, next :any){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}