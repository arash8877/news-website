import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRoutes from "./routs/userRoutes.js"; //have given a new name "userRoutes"
import categoryRoutes from "./routs/categoryRoutes.js";
import videoRoutes from "./routs/videoRouters.js";
import newsRoutes from "./routs/newsRoutes.js";
import commentRoutes from "./routs/commentRoutes.js";
import sendEmailRoutes from "./routs/sendEmailRoutes.js";

// Database username: news
// Database password: UOhc!YW8rlo*lhdt


dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("database connected");
  await db.sync();
} catch (error) {
  console.log("DB error***", error);
}

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(fileUpload()); // a package that helps to upload file/image.
app.use(express.static("public")); // to be able to read the static files in the 'public' folder
app.use(cookieParser());
app.use(userRoutes);
app.use(categoryRoutes);
app.use(videoRoutes);
app.use(newsRoutes);
app.use(commentRoutes);
app.use(sendEmailRoutes);

app.listen(5000, () => console.log("server is running"));
