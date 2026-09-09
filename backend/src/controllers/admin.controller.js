import { prisma } from "../db/db.js";
import { userSchema } from "../validations/validation.js";
import { hashPassword } from "../utils/password_utils.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        stores: true,
        rating: true,
        createdAt: true,
      },
    });
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const validate = userSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validate.error.errors,
      });
    }
    const { name, email, password, address,role } = validate.data;
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
        role,
      },
      omit : {
        password: true,
      }
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
