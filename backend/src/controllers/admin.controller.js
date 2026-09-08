import {prisma} from "../db/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
        select: {   
            id: true,
            name: true,
            email: true,
            address: true,
            role: true,
            stores:true,
            rating:true,
            createdAt: true,
        }
    })
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