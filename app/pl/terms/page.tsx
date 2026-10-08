import { legalDocuments } from "../../legal-content";
import { LegalPage } from "../../legal-layout";
import { createResourceMetadata } from "../../resource-metadata";

export const metadata = createResourceMetadata("terms", "pl");
export default function Page() { return <LegalPage locale="pl" resource="terms" document={legalDocuments.pl.terms} />; }
