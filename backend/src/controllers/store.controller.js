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

    const ratings = await prisma.rating.findMany({
      where: {
        storeId: store.id,
      },
      include: {
        user: true,
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
