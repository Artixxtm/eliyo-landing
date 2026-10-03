import { LandingPage } from "./landing-page";
import { createPageMetadata } from "./site-metadata";

export const metadata = createPageMetadata({
  title: "Eliyo - Personal car assistant",
  description: "Eliyo keeps track of maintenance, mileage, documents and your car’s history. It tells you what needs attention.",
  path: "/",
  locale: "en_US",
});

export default function Home() {
  return <LandingPage locale="en" />;
}
