import type { Metadata } from "next";
import { LandingPage } from "../landing-page";

export const metadata: Metadata = {
  title: "Eliyo | Персональний асистент для авто",
  description: "Eliyo стежить за обслуговуванням, пробігом, документами та історією авто. Він підказує, що потребує уваги.",
};

export default function UkrainianHome() {
  return <LandingPage locale="uk" />;
}
