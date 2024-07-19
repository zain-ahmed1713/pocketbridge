import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PocketBridge",
  description:
    "With PocketBridge, effortlessly sync your Pocket reads directly to your Notion workspace. Simply connect your accounts, and let PocketBridge handle the rest. Enjoy a clutter-free, organized, and automated experience that keeps your favorite content at your fingertips. Say goodbye to manual transfers and hello to seamless productivity with PocketBridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
