import express from "express";
import {connectDb} from "./src/db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// import routes
import authRoutes from "./src/routes/auth.route.js";
import adminRoutes from "./src/routes/admin.route.js";
import storeRoutes from "./src/routes/store.route.js";
import ratingRoutes from "./src/routes/rating.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("Server is healthy!!");
});

// all routes

app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/store", storeRoutes);
app.use("/api/v1/rating",ratingRoutes);

const port = process.env.PORT || 8080;

await connectDb();




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});