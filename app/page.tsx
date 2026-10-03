import type { Metadata } from "next";
import { LandingPage } from "./landing-page";

export const metadata: Metadata = {
  title: "Eliyo | Personal car assistant",
  description: "Eliyo keeps track of maintenance, mileage, documents and your car’s history. It tells you what needs attention.",
};

export default function Home() {
  return <LandingPage locale="en" />;
}
