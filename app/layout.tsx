import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "../lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.appUrl),
  title: {
    default: `${BRAND.name} — A little closer to your next chapter`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Build an ATS-friendly resume that sounds like you. Get thoughtful AI help with your story, your job match, and your next step.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: BRAND.name,
    title: `${BRAND.name} — A little closer to your next chapter`,
    description: "A calmer way to build a resume that feels like you and gets you closer to work you love.",
    images: [{ url: "/images/hero.jpg", width: 1680, height: 945, alt: "An astronaut and their cat under a starry dusk sky" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — A little closer to your next chapter`,
    description: "A calmer way to build a resume that feels like you and gets you closer to work you love.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
