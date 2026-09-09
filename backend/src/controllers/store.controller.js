import {prisma} from "../db/db.js";

export const getStoreOwnerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "STORE_OWNER") {
      return res.status(403).json({
        message: "You are not authorized to access this resource",
      });
    }

    const store = await prisma.store.findFirst({
      where: {
        ownerId: userId,
      },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const { sortBy = "rating", order = "desc" } = req.query;

    const allowedSortFields = ["rating", "createdAt"];

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

    const ratings = await prisma.rating.findMany({
      where: {
        storeId: store.id,
      },
      include: {
        user: true,
      },
      orderBy: {
        [sortBy]: order,
      },
    });

    const averageRating = await prisma.rating.aggregate({
      where: {
        storeId: store.id,
      },
      _avg: {
        rating: true,
      },
    });

    return res.status(200).json({
      message: "Store owner dashboard fetched successfully",
      store,
      averageRating: averageRating._avg.rating || 0,
      ratings,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const searchStores = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search || search.trim() === "") {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const stores = await prisma.store.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return res.status(200).json({
      message: "Stores retrieved successfully",
      stores,
    });
  } catch (error) {
  

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const sortStores = async (req, res) => {
  try {
    const { sortBy = "name", order = "asc" } = req.query;

    const allowedFields = ["name", "email", "address"];

    if (!allowedFields.includes(sortBy)) {
      return res.status(400).json({
        message: "Invalid sort field",
      });
    }

    if (!["asc", "desc"].includes(order)) {
      return res.status(400).json({
        message: "Invalid sort order",
      });
    }

    const stores = await prisma.store.findMany({
      orderBy: {
        [sortBy]: order,
      },
    });

    return res.status(200).json({
      message: "Stores sorted successfully",
      stores,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
