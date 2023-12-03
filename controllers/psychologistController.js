import { Psychologist } from "../models/Psychologist.js";
import { generateJWT } from "../helpers/generateJWT.js";
import { generateID } from "../helpers/generateID.js";

const register = async (req, res) => {
  const { email } = req.body;

  //   prevent user duplication
  const existeUsuario = await Psychologist.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Este email ya está registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // save a new user
    const psychologist = new Psychologist(req.body);
    const psychologistSaved = await psychologist.save();
    res.json({ msg: "registro" });
  } catch (error) {
    console.log(error);
  }
};

const profile = (req, res) => {
  const { psychologist } = req;

  res.json({ psychologist });
};

const confirmation = async (req, res) => {
  const { token } = req.params;

  const userConfirm = await Psychologist.findOne({ token });

  if (!userConfirm) {
    const error = new Error("Token Inválido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    userConfirm.token = null;
    userConfirm.confirmed = true;
    await userConfirm.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autentication = async (req, res) => {
  const { email, password } = req.body;
  // user exist comprobation
  const user = await Psychologist.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(403).json({ msg: error.message });
  } else {
    //   user confirmed comprobation
    if (!user.confirmed) {
      const error = new Error("Tu cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    } else {
      //   checkin user pasword
      if (await user.checkPassword(password)) {
        // user autentication
        res.json({ token: generateJWT(user.id) });
      } else {
        const error = new Error("Contraseña incorrecta");
        return res.status(403).json({ msg: error.message });
      }
    }
  }
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;

  const existPsychologist = await Psychologist.findOne({ email });

  if (!existPsychologist) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    existPsychologist.token = generateID();
    await existPsychologist.save();
    res.json({
      msg: "Hemos enviado un email con las instrucciones para recuperar tu contraseña",
    });
  } catch (error) {
    console.log(error);
  }
};

const confirmationToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await Psychologist.findOne({ token });

  if (validToken) {
    res.json({ msg: "token valido" });
  } else {
    const error = new Error("Token Invalido");
    return res.status(400).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const psychologist = await Psychologist.findOne({ token });

  if (!psychologist) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    psychologist.token = null;
    const hashedPassword = await bcrypt.hash(password, 10);
    psychologist.password = hashedPassword;
    await psychologist.save();
    res.json({ msg: "Nueva contraseña guardada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  profile,
  confirmation,
  autentication,
  forgottenPassword,
  confirmationToken,
  newPassword,
};