import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { psychologistRouter } from "./routes/psychologistRoutes.js";
import { patientRouter } from "./routes/patientRoutes.js";

// calling express, dotenv and DB

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

// allowed domains controller
const allowedDomains = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if(!origin){
      callback(null, true);
      return;
    }
    if (allowedDomains.indexOf(origin) !== -1) {
      // request is allowed
      callback(null, true);
    } else {
      callback(new Error("No access allowed by CORS"));
    }
  },
};

// adding Corse request to Express
app.use(cors(corsOptions));

// endpoints
app.use("/api/psychologist", psychologistRouter);
app.use("/api/patient", patientRouter);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`App funcionando desde el puerto: ${PORT}`);
});
