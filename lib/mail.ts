import nodemailer from "nodemailer";

// 1차는 Gmail SMTP(앱 비밀번호). 도메인 주소로 보내고 싶어지면 발송 서비스로 교체한다.
export async function sendMail(opts: { to: string; subject: string; text: string; replyTo?: string }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD 환경변수가 없습니다");
  const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transport.sendMail({ from: `Bohemorae <${user}>`, ...opts });
}
