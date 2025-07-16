import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import connectToDB from "./lib/connect-to-db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

await connectToDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
