import { LandingPage } from "../landing-page";
import { createPageMetadata } from "../site-metadata";

export const metadata = createPageMetadata({
  title: "Eliyo - Персональний асистент для авто",
  description: "Eliyo стежить за обслуговуванням, пробігом, документами та історією авто. Він підказує, що потребує уваги.",
  path: "/ua",
  locale: "uk_UA",
});

export default function UkrainianHome() {
  return <LandingPage locale="uk" />;
}
