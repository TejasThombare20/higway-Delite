import {NextFunction, Request , Response} from "express"
import UserModel from "../model/User.model.js";

export async function verifyUser(req : Request, res : Response, next : NextFunction){
    try {
        
        const { email } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ email });
        if(!exist) return res.status(404).send({ error : "Unauthorised error"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}