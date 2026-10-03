import type { Metadata } from "next";
import { LandingPage } from "../landing-page";

export const metadata: Metadata = {
  title: "Eliyo | Osobisty asystent auta",
  description: "Eliyo śledzi serwis, przebieg, dokumenty i historię auta. Podpowiada, co wymaga uwagi.",
};

export default function PolishHome() {
  return <LandingPage locale="pl" />;
}
