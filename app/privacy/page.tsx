import { legalDocuments } from "../legal-content";
import { LegalPage } from "../legal-layout";
import { createResourceMetadata } from "../resource-metadata";

export const metadata = createResourceMetadata("privacy", "en");
export default function Page() { return <LegalPage locale="en" resource="privacy" document={legalDocuments.en.privacy} />; }
