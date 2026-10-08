import { legalDocuments } from "../legal-content";
import { LegalPage } from "../legal-layout";
import { createResourceMetadata } from "../resource-metadata";

export const metadata = createResourceMetadata("terms", "en");
export default function Page() { return <LegalPage locale="en" resource="terms" document={legalDocuments.en.terms} />; }
