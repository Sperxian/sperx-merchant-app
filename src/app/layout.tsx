import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="h-full bg-gray-100 flex justify-center">
        <div className="w-full md:max-w-md h-full md:h-[90vh] md:my-6 md:rounded-2xl md:border md:border-gray-400 md:dark:border-gray-800 md:shadow flex flex-col overflow-hidden">
          <ClerkProvider>{children}</ClerkProvider>
        </div>
      </body>
    </html>
  );
}
