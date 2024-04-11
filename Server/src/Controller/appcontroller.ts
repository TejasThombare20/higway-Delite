import { Request, Response, response } from "express";
import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

const JWT_SECRET = "lAGWjVG0BmK3yCIhL7pTA9XG8SqLEf5fiTsFqmpLyuk=";

export async function register(req: Request, res: Response) {
  try {
    if (!req.app.locals.resetSession) {
      return res
        .status(404)
        .send({ success: false, message: "invalid session" });
    }
    const { firstName, lastName, password, email } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Incomplete fields" });
    }

    const existEmail = await UserModel.findOne({ email: email });

    if (existEmail) {
      return res
        .status(400)
        .send({ success: false, message: "Email is already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      //   username,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      email,
    };

    const user = await UserModel.create(data);
    console.log("user created", user);

    req.app.locals.resetSession = false;

    return res.status(200).send({
      data: user,
      success: true,
      message: "User created successfully",
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
}

export async function checkmail(req: any, res: any) {
  const { email } = req.body;

  console.log("email: ", email);

  try {
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "unable to get email" });
    }

    const user = await UserModel.findOne({ email: email });

    if (user) {
      return res
        .status(200)
        .send({ success: true, data: true, message: "User exist" });
    } else {
      return res
        .status(200)
        .send({ success: true, data: false, message: "User not found" });
    }
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Incomplete credentials",
        data: false,
      });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User not found", data: false });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res
        .status(200)
        .send({ success: false, message: "Incorrect password", data: false });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      success: true,
      message: "Login successfully completed",
      data: token,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
}

export async function generateOTP(req: any, res: any) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req: any, res: any) {
  const { code } = req.query;
  console.log("code", code);
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res
      .status(201)
      .send({ message: "Verify Successsfully!", success: true, data: true });
  }
  return res
    .status(201)
    .send({ message: "Invalid OTP", success: true, data: false });
}

export async function createResetSession(req: any, res: any) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}
