import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppThemeProvider } from "@/components/providers/app-theme-color/app-theme-provider";
import CurrentUserProvider from "@/components/providers/current-user/user-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Electron",
  description: "Desktop app built with Nextjs and Electronjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CurrentUserProvider>
            {children}
          </CurrentUserProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
