import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eliyo | Personal car assistant",
  description: "Eliyo keeps track of maintenance, mileage, documents and your car’s history. It tells you what needs attention.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
