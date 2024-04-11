var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
let config = {
    service: 'gmail',
    auth: {
        user: "thombaretejas44@gmail.com",
        pass: "tdbp zrke qnkr vkzi"
    }
};
let transporter = nodemailer.createTransport(config);
let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
    },
});
export const registerMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, text, subject } = req.body;
    // body of the email
    var email = {
        body: {
            intro: text || "one time password for creating new account ",
            outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
    };
    var emailBody = MailGenerator.generate(email);
    console.log("userEmail", userEmail);
    let message = {
        from: "thombaretejas44@gmail.com",
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody,
    };
    transporter
        .sendMail(message)
        .then(() => {
        return res
            .status(200)
            .send({ msg: "You should receive an email from us." });
    })
        .catch((error) => res.status(500).send({ error }));
});
