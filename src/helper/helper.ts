import axios from "axios";

 
const baseURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost"
    : "http://hd-lb-522170643.ap-south-1.elb.amazonaws.com";

export async function registerUser(credentials: any) {
  try {
    const data = await axios.post(`${baseURL}/api/register`, credentials);

    console.log("data", data);

    return data;
  } catch (error) {
    console.log("error", error);
  }
}

export async function checkEmailExists(email: string) {
  try {
    const data = await axios.post(`${baseURL}/api/existmail`, { email: email });
    console.log("data1", data);
    console.log("datadata", data.data.data);

    return data.data?.data;
  } catch (error) {
    console.log("error", error);
  }
}

// /** login function */
export async function verifyPassword(email: string, password: string) {
  try {
    if (email) {
      const { data } = await axios.post(`${baseURL}/api/login`, {
        email,
        password,
      });

      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
}

// /** generate OTP */
export async function generateOTP(email: string) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get(`${baseURL}/api/generateOTP`);

    console.log("code", code);

    let text = `Your  OTP is ${code}. Verify and create your account`;
    await axios.post(`${baseURL}/api/registerMail`, {
      userEmail: email,
      text,
      subject: "Password Recovery OTP",
    });

    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

// /** verify OTP */
export async function verifyOTP(code: string) {
  try {
    const { data, status } = await axios.get(`${baseURL}/api/verifyOTP`, {
      params: { code },
    });
    return { data, status };
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
}
