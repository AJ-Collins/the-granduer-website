import type { Metadata } from "next";
import {
  Anton,
  Fraunces,
  Pinyon_Script,
  Space_Grotesk,
  Instrument_Serif,
  Italiana,
} from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["300", "400"],
  variable: "--font-fraunces",
});

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-grotesk",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
});

export const metadata: Metadata = {
  title: "D'Grandeur Event Centre — Experience Beyond the Ordinary",
  description:
    "Where luxury, style and elegance come together to create moments that become lasting memories. Book a viewing at D'Grandeur Event Centre.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${fraunces.variable} ${pinyon.variable} ${grotesk.variable} ${instrument.variable} ${italiana.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}