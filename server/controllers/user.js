import bcrypt from "bcrypt";
// import User from "../models/user";.
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    console.log("Register user");

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req);
    // res.set("channel", "login");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please fill in all fields",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Invalid credentials",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email or password",
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        msg: "Welcome to the dashboard",
      });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      msg: "User logged out successfully",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
