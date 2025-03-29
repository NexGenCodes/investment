import Transporter from "./transporter";
import fs from "fs";
import path from "path";
import ejs from "ejs";

// Create a function to render the email template
async function renderTemplate(templateName: string, data: object) {
  const templatePath = path.join(
    process.cwd(),
    "src/email/templates",
    `${templateName}.ejs`
  );
  const template = fs.readFileSync(templatePath, "utf-8");
  return ejs.render(template, data);
}

export async function sendOtp(email: string, otp: string) {
  try {
    const html = await renderTemplate("otp", { otp });
    await Transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
}

export async function sendEmail(email: string, message: string) {
  try {
    const html = await renderTemplate("message", { message });
    await Transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending message email:", error);
    return false;
  }
}
