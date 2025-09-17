import express from "express";
import connectToMongo from "./db.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js"
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(express.json())//middlewhere to deal in json

app.get('/', (req, res) => {
  res.send('Hello Vineet!')
})

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Connect to server at ${port}`)
})

