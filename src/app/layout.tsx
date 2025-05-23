import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import AppWrapper from "@/components/AppWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Discover, favorite, and explore movies!",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black text-white"}>
        <AppWrapper>
          <>{children}</>
          {modal}
        </AppWrapper>
      </body>
    </html>
  );
}
