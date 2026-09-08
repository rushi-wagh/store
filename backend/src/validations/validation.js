import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character")
    .max(60, "Name must be less than 60 characters"),
  email: z.email("Please enter a valid email address"),
  address: z
    .string()
    .min(1, "Adddress must be at least 1 character")
    .max(400, "Address must be less than 400 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be less than 16 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter"),
});

export const storeSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character")
    .max(40, "Name must be less than 40 characters"),
  email: z.email("Please enter a valid email address"),
  address: z
    .string()
    .min(1, "Address must be at least 1 character")
    .max(400, "Address must be less than 400 characters"),
});

export const ratingSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  comment: z
    .string()
    .max(400, "Comment must be less than 400 characters")
    .optional(),
});
