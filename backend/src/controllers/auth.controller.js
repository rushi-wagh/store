import { hashPassword, comparePassword } from "../utils/password_utils.js";
import {prisma} from "../db/db.js";
import {userSchema, passwordSchema} from "../validations/validation.js";
import { generateAccessToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    const validateUser = await userSchema.safeParse(req.body);

    if (!validateUser.success) {
    
      return res.status(400).json({
        message: "Invalid user data",
        errors: validateUser.error.errors,
      });
    }

    const { name, email, password, address } = validateUser.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
      },
      omit: {
        password: true,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const validateUser = userSchema.safeParse(req.body);

    if (!validateUser.success) {
      return res.status(400).json({
        message: "Invalid user data",
        errors: validateUser.error.errors,
      });
    }

    const { email, password } = validateUser.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found,Please register first",
      });
    }

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = await generateAccessToken(user);

    res.cookie("AccessToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const returnUser = await prisma.user.findUnique({
      where: { id: user.id },
      omit: {
        password: true,
      },
    });

    return res.status(200).json({
      message: "User found",
      user: returnUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("AccessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const validate = passwordSchema.safeParse(req.body);

    if (!validate.success) {
      return res.status(400).json({
        message: "Invalid password data",
        errors: validate.error.errors,
      });
    }

    const { oldPassword, newPassword } = validate.data;
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatched = await comparePassword(oldPassword, user.password);

    if (!isMatched) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};