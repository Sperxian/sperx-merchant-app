import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="h-full bg-gray-100 flex justify-center">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
