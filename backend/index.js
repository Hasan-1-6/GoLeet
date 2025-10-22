import express from "express";
import dotenv from 'dotenv'
import connectDB from './db/mongodb.js'
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js'
import sidebarRoutes from './routes/sidebar.routes.js' 
import sheetRoutes from './routes/sheetPage.routes.js'
import homepageRoutes from './routes/homepage.routes.js'
import cors from 'cors'


dotenv.config();
export const app = express();
const allowedUrl = process.env.NODE_ENV === "production" ? "https://go-leet.vercel.app/" : "http://localhost:5173";
app.use(cors({
  origin: allowedUrl, // your React app’s URL
  credentials: true                // allow cookies
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/sidebar", sidebarRoutes)
app.use("/api/sheet", sheetRoutes)
app.use("/api/homepage", homepageRoutes)
app.get("/", (req, res) => res.send("Backend is running") )

const port = process.env.PORT || 3000;

connectDB().then(
    app.listen(port, ()=> {
        console.log(`Server listening at ${port}`)
      })
);

