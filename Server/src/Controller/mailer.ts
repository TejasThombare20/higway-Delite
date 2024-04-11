import nodemailer from "nodemailer";
import Mailgen from "mailgen";



let config = {
    service : 'gmail',
    auth : {
        user: "thombaretejas44@gmail.com",
        pass: "tdbp zrke qnkr vkzi"
    }
}

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});


export const registerMail = async (req: any, res: any) => {
  const { userEmail, text, subject } = req.body;

  // body of the email
  var email = {
    body: {
      intro: text || "one time password for creating new account ",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);
 console.log("userEmail",userEmail)

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
    .catch((error: any) => res.status(500).send({ error }));
};
