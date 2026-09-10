import { prisma } from "../db/db.js";
import { userSchema, storeSchema } from "../validations/validation.js";
import { hashPassword } from "../utils/password_utils.js";

export const getAllUsers = async (req, res) => {
  try {
    const { sortBy = "name", order = "asc" } = req.query;

    const allowedSortFields = ["name", "email", "address", "role", "createdAt"];

    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({
        message: "Invalid sort field",
      });
    }

    if (!["asc", "desc"].includes(order)) {
      return res.status(400).json({
        message: "Invalid sort order",
      });
    }

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
      orderBy: {
        [sortBy]: order,
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
        errors: validate.error.issues,
      });
    }
    const { name, email, password, address, role } = validate.data;
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

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        message: "Id is required",
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      omit: {
        password: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "No user found with given id",
      });
    }
    return res.status(200).json({
      message: "User Succesfully fetched",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const addStore = async (req, res) => {
  try {
    const validate = storeSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validate.error.issues,
      });
    }
    const { name, email, address, ownerId } = validate.data;
    const user = await prisma.user.findUnique({
      where: { id: ownerId },
    });
    if (user.role !== "STORE_OWNER") {
      return res.status(400).json({
        message: "User is not a store owner",
      });
    }
    const existingStore = await prisma.store.findUnique({
      where: { email },
    });
    if (existingStore) {
      return res.status(409).json({
        message: "There exists store with this email",
      });
    }
    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId,
      },
    });
    return res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        rating: {
          select: {
            rating: true,
          },
        },
      },
    });
    const storesWithRating = stores.map((store) => {
      const total = store.rating.reduce(
        (sum, rating) => sum + rating.rating,
        0,
      );

      const averageRating =
        store.rating.length > 0 ? total / store.rating.length : 0;

      return {
        ...store,
        rating: averageRating,
      };
    });
    return res.status(200).json({
      message: "Stores fetched successfully",
      stores: storesWithRating,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
