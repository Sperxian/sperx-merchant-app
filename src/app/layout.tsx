import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <ClerkProvider>{children}</ClerkProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
