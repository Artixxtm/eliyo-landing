import { legalDocuments } from "../../legal-content";
import { LegalPage } from "../../legal-layout";
import { createResourceMetadata } from "../../resource-metadata";

export const metadata = createResourceMetadata("terms", "uk");
export default function Page() { return <LegalPage locale="uk" resource="terms" document={legalDocuments.uk.terms} />; }
