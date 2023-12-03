import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { psychologistRouter } from "./routes/psychologistRoutes.js";
import { patientRouter } from "./routes/patientRoutes.js";

// calling express, dotenv and DB

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

// endpoints

app.use("/api/psychologist", psychologistRouter);
app.use("/api/patient", patientRouter);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`App funcionando desde el puerto: ${PORT}`);
});
