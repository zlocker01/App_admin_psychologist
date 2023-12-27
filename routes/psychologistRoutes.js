import express from "express";
import { checkAuth } from "../middleware/authMiddleware.js";
import {
  register,
  profile,
  confirmation,
  autentication,
  forgottenPassword,
  confirmationToken,
  newPassword,
  updateProfile,
} from "../controllers/psychologistController.js";

// express router
export const psychologistRouter = express.Router();

// routes for psychologist
psychologistRouter.post("/", register);

// using dynamic parametter with express for token validaton
psychologistRouter.get("/confirmation/:token", confirmation);

psychologistRouter.post("/login", autentication);

psychologistRouter.post("/forgotten-password", forgottenPassword);
psychologistRouter.route("/forgotten-password/:token").post(newPassword).get(confirmationToken);

// private access using middleware 
psychologistRouter.get("/profile", checkAuth, profile);
psychologistRouter.put("/profile/:id", checkAuth, updateProfile);
