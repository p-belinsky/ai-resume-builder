import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glimpse — A little inspiration for your day",
  description:
    "A cozy corner to share little moments, find your people, and feel a little more inspired.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
