import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "semantic-ui-css/semantic.min.css";
import { Container, Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RAG App",
  description: "Empower Your Organizations Document Intelligence with RAG",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="blue">
          <main>
            <Container className="w-screen min-h-screen p-3 bg-gradient-to-tl from-yellow-100 to-pink-100">
              {children}
            </Container>
          </main>
        </Theme>
      </body>
    </html>
  );
}
