import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ModeToggle } from "~/components/ui/mode";

export const metadata: Metadata = {
  title: "Form submission",
  description: "Created by me",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="flex justify-end p-4">
            <ModeToggle />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
