import { legalDocuments } from "../../legal-content";
import { LegalPage } from "../../legal-layout";
import { createResourceMetadata } from "../../resource-metadata";

export const metadata = createResourceMetadata("privacy", "ru");
export default function Page() { return <LegalPage locale="ru" resource="privacy" document={legalDocuments.ru.privacy} />; }
