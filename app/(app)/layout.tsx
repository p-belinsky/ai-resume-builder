import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./app.css";
import { BRAND } from "../../lib/config";
import { ToastProvider } from "../../components/app/Toast";

export const metadata: Metadata = {
  title: { default: `${BRAND.name} workspace`, template: `%s | ${BRAND.name}` },
  robots: { index: false, follow: false },
};

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}