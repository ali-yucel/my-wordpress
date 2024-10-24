import localFont from "next/font/local";
import "./globals.css";
import Header from "./ui/Header.js/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <main className="min-h-screen">
          <div className="container">{children}</div>
        </main>
        <footer id="footer">
          <div className="container mx-auto">Footer!</div>
        </footer>
      </body>
    </html>
  );
}
