import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const emailForgottenPassword = async (data) => {
  // transporter obj with data to send mails
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, name, token } = data;

  // sending email to confirm account
  const info = await transport.sendMail({
    from: "PsychoTracker",
    to: email,
    subject: "Reestablece tu Contraseña",
    text: "Reestablece tu Contraseña",
    html: `<div style="background-color: #535b61; color: #fff; padding:10px;">
    <h1>¡Hola ${name}, has solicitado reestablecer tu Cotraseña en PsychoTracker!</h1>
    <p>Crea tu nueva contraseña haciendo clic en el siguiente botón:</p> 
    <a href="${process.env.FRONTEND_URL}/forgotten-password/${token}" style="background-color: #266FB3; color: #fff; padding:10px; text-decoration:none; border-radius:5px;">Reestablecer Contraseña</a>
    <p>Si tu no solicitaste un cambio de contraseña ignora este correo ⚠️</p>
    <img src="https://storage.googleapis.com/pai-images/e861337aafc04987a069eb0674310586.jpeg" alt="Psychologist on therapy" width="270" height="290">
    </div>`,
  });
  console.log("Message sent: %s", info.messageId);
};

