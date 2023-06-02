import express from "express";
import db from "./config/Database.js";
import userRoutes from "./routs/userRoutes.js"; //have given a new name "userRoutes"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

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

app.use(express.json());
app.use(fileUpload()); // a package that helps to upload file/image.
app.use(express.static("public")) // to be able to read the static files in the 'public' folder
app.use(cookieParser());
app.use(userRoutes);

app.listen(5000, () => console.log("server is running"));
