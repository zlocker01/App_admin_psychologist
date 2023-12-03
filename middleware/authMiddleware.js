import jwt from "jsonwebtoken";
import { Psychologist } from "../models/Psychologist.js";

export const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.psychologist = await Psychologist.findById(decoded.id).select(
        "-password -token -confirmed"
      );
      return next();
    } catch (error) {
      res.status(401).json({ msg: "Token invalido" });
    }
  }

  if (!token) {
    const error = new Error("Token no proporcionado");
    res.status(401).json({ msg: error.message });
  }
  next();
};
