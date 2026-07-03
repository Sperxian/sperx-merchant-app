import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AdminDashboardShell } from "@/src/components/Layouts/AdminDashboardShell";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <ClerkProvider>
          <AdminDashboardShell>{children}</AdminDashboardShell>
        </ClerkProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
