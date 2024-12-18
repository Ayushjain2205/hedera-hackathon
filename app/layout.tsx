import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";

import "./globals.css";

export const metadata: Metadata = {
  title: "KYAgent",
  description: "KYAgent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <ThirdwebProvider>
        <body>{children}</body>
      </ThirdwebProvider>
    </html>
  );
}
