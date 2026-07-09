import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { ToastProvider } from "../components/ui/Toast";
import DashboardLayout from "../components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "MediPulse - Smart Medicine Reminder & Health Monitoring",
  description: "A premium mobile-first healthcare assistant providing automated medication schedules, live compliance reports, and emergency caregiver links.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <AppProvider>
          <ToastProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
