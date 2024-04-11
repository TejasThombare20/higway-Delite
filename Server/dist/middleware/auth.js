var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
const JWT_SECRET = "lAGWjVG0BmK3yCIhL7pTA9XG8SqLEf5fiTsFqmpLyuk=";
/** auth middleware */
export default function Auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // access authorize header to validate request
            const token = req.headers.authorization.split(" ")[1];
            // retrive the user details fo the logged in user
            const decodedToken = yield jwt.verify(token, JWT_SECRET);
            req.user = decodedToken;
            next();
        }
        catch (error) {
            res.status(401).json({ error: "Authentication Failed!" });
        }
    });
}
export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    };
    next();
}
