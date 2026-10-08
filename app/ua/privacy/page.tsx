import { legalDocuments } from "../../legal-content";
import { LegalPage } from "../../legal-layout";
import { createResourceMetadata } from "../../resource-metadata";

export const metadata = createResourceMetadata("privacy", "uk");
export default function Page() { return <LegalPage locale="uk" resource="privacy" document={legalDocuments.uk.privacy} />; }
