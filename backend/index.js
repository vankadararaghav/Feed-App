import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import connectToDB from "./lib/connect-to-db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.all("*", (req, res, next) => { 
    return res.status(404).send({
        message: 'Route not found',
        errorCode: '404'
    })
})

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

await connectToDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
