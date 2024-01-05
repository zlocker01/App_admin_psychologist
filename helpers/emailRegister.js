import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const emailRegister = async (data) => {
  // transport obj with data to send mails
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
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
    subject: "Confirma tu cuenta con nosotros",
    text: "Confirma tu cuenta con nosotros",
    html: `<div style="background-color: #535b61; color: #fff; padding:10px;">
    <h1>Bienvenid@ ${name}, ¡Gracias por registrarte en PsychoTracker!</h1>
    <p>Para comenzar a utilizar nuestra plataforma, por favor confirma tu cuenta haciendo clic en el siguiente botón:</p> 
    <a href="${process.env.FRONTEND_URL}/confirmation/${token}" style="background-color: #266FB3; color: #fff; padding:10px; text-decoration:none; border-radius:5px;">Confirmar Cuenta</a>
    <p>Una vez confirmada, podrás comenzar a realizar un seguimiento de tus pacientes y mejorar tu administración de manera efectiva y más facil. Recuerda que lo que se registra es más fácil de medir y mejorar en el tiempo.</p> <img src="https://storage.googleapis.com/pai-images/9b3307dc6cfb400b937f569c4addff26.jpeg" alt="Psychologist on therapy" width="270" height="290">
    </div>`,
  });
  console.log("Message sent: %s", info.messageId);
};
