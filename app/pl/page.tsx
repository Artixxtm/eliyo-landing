import { LandingPage } from "../landing-page";
import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Eliyo - Osobisty asystent auta",
  description: "Eliyo śledzi serwis, przebieg, dokumenty i historię auta. Podpowiada, co wymaga uwagi.",
  path: "/pl",
  locale: "pl_PL",
});

export default function PolishHome() {
  return <LandingPage locale="pl" />;
}
