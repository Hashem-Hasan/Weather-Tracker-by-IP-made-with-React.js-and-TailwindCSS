import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkyScan Weather Tracker",
  description: "Stay updated with accurate weather forecasts from SkyScan Weather Tracker. Get real-time weather information, forecasts, and more for your location.",
  keywords: ["weather", "forecast", "SkyScan", "tracker", "real-time", "meteorology"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
