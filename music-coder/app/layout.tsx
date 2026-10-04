import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Song-to-Gate Coder | Manifestor Anonymous",
  description: "Hear the 64 Human Design gates in music. Code any song from feeling to center, circuit and gate.",
  openGraph: { title: "Stop Memorizing. Start Hearing.", description: "The interactive Song-to-Gate Coder from Manifestor Anonymous.", type: "website" },
  twitter: { card: "summary", title: "Song-to-Gate Coder", description: "Turn what you hear in a song into Human Design gate possibilities." },
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
