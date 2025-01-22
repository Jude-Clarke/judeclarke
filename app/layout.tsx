import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Chat from "./components/Chat/chat";
import yearsSince2020 from "./utils/calcExp";

export const metadata = {
  title: "Hire Jude Clarke | Full Stack Engineer | React | UI Engineer",
  description: `${yearsSince2020()} years building engaging UI/UX and CRUD routes, including 18 months at a New York startup to completely replatform and redesign their web application in React. To learn how I can contribute to your company, ask me to demonstrate some of my web applications for you!`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="centerChat">
          <Chat />
        </div>
      </body>
    </html>
  );
}
