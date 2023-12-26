import express from "express";
import {
  addPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

export const patientRouter = express.Router();

patientRouter
.route("/")
//   add patient
.post(checkAuth, addPatient)
//   get all patients
.get(checkAuth, getPatients);

//   get one patient with ID
patientRouter
.route("/:id")
.get(checkAuth, getPatient)
.put(checkAuth, updatePatient)
.delete(checkAuth, deletePatient);
