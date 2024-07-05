import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AppRoutes from "./src/router/index.js";
import connectDatabase from "./src/config/dbConnection.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDatabase();

const PORT = process.env.PORT;
const app = express();

// Convert import.meta.url to a file path and get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "images" directory
app.use("/images", express.static(path.join(__dirname, "./images")));

app.use(cors());
app.use(express.json());
app.use(AppRoutes);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
