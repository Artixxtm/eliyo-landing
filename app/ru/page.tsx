import { LandingPage } from "../landing-page";
import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Eliyo - Персональный ассистент для авто",
  description: "Eliyo следит за обслуживанием, пробегом, документами и историей авто. Он подсказывает, что требует внимания.",
  path: "/ru",
  locale: "ru_RU",
});

export default function RussianHome() {
  return <LandingPage locale="ru" />;
}
