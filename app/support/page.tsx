import { SupportPage } from "../resource-pages";
import { createResourceMetadata } from "../resource-metadata";

export const metadata = createResourceMetadata("support", "en");
export default function Page() { return <SupportPage locale="en" />; }
