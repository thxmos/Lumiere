import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/shared/components/next-theme-provider";
import { APP_DESCRIPTION, APP_NAME } from "@/config/app";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  // icons: {
  //   icon: "../../public/favicon.ico",
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themes = [
    "light",
    "dark",
    "bean",
    "blue",
    "green",
    "purple",
    "purple-dark",
    "orange",
    "pink",
    "teal",
    "teal-light",
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          themes={themes}
          disableTransitionOnChange
        >
          <div className="max-h-screen flex flex-col h-screen">
            <Toaster richColors />

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
