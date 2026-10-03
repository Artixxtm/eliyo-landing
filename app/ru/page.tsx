import type { Metadata } from "next";
import { LandingPage } from "../landing-page";

export const metadata: Metadata = {
  title: "Eliyo | Персональный ассистент для авто",
  description: "Eliyo следит за обслуживанием, пробегом, документами и историей авто. Он подсказывает, что требует внимания.",
};

export default function RussianHome() {
  return <LandingPage locale="ru" />;
}
