import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (name: string, token: string, email: string) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <hugocruzlfc@gmail.com>', // sender address
    to: email,
    subject: "Forget Password", // Subject line
    html: `
      <b>Hello ${name},
      your forget password link is below click the link <br/>
       <p>Click <a href="http://localhost:3000/forget-password/${token}">here</a> to reset your password</p>`, // html body
  });

  return info;
};
