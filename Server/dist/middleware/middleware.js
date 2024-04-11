var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModel from "../model/User.model.js";
export function verifyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.method == "GET" ? req.query : req.body;
            // check the user existance
            let exist = yield UserModel.findOne({ email });
            if (!exist)
                return res.status(404).send({ error: "Unauthorised error" });
            next();
        }
        catch (error) {
            return res.status(404).send({ error: "Authentication Error" });
        }
    });
}
