import express from "express";
import connectToDb from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./Routes/authRoutes.js";
import path from "path";



dotenv.config();
const app = express();

const __dirname = path.resolve();
app.use("/", express.static(path.join(__dirname, "./ecommerce_frontend/dist")));

connectToDb()
  .then(() => {
    console.log("✅ Database connection successful");

    // app.use(cors({
    //     origin: "http://localhost:5173", 
    //     credentials: true, 
    //   }));   
      
      app.use(express.json());
    app.use(cookieParser());

    app.use("/api/auth", router);

    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });
