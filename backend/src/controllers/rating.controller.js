import { prisma } from "../db/db.js";
import { ratingSchema } from "../validations/validation.js";

export const addRating = async (req, res) => {
  try {
    const validate = ratingSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validate.error.issues,
      });
    }
    const { rating, storeId, comment } = validate.data;
    const userId = req.user.id;
    const store = await prisma.store.findFirst({
      where: { id: storeId },
    });
    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }
    const existingRating = await prisma.rating.findFirst({
      where: {
        userId,
        storeId,
      },
    });
    if (existingRating) {
      return res.status(409).json({
        message: "You have already rated this store",
      });
    }
    const newRating = await prisma.rating.create({
      data: {
        rating,
        comment: comment || null,
        userId,
        storeId,
      },
    });

    return res.status(201).json({
      message: "Rating added successfully",
      rating: newRating,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getRatingsForStore = async (req, res) => {
  try {
    const storeId = Number(req.params.storeId);

    if (Number.isNaN(storeId)) {
      return res.status(400).json({
        message: "Invalid store ID",
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

    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const ratings = await prisma.rating.findMany({
      where: {
        storeId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
    });

    return res.status(200).json({
      message: "Ratings retrieved successfully",
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateRating = async (req, res) => {
  try {
    const ratingId = Number(req.params.ratingId);
    const validate = ratingSchema.safeParse(req.body);
    if (!validate.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validate.error.issues,
      });
    }
    const { rating, comment } = req.body;
    const userId = req.user.id;

    const existingRating = await prisma.rating.findUnique({
      where: { id: ratingId },
    });

    if (!existingRating) {
      return res.status(404).json({
        message: "Rating not found",
      });
    }

    if (existingRating.userId !== userId) {
      return res.status(403).json({
        message: "You are not the owner of this rating",
      });
    }

    const updatedRating = await prisma.rating.update({
      where: { id: ratingId },
      data: {
        rating,
        comment: comment || null,
      },
    });

    return res.status(200).json({
      message: "Rating updated successfully",
      rating: updatedRating,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
