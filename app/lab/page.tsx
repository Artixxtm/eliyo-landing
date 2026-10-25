import { createLabMetadata, LabPage } from "../lab-page";

export const metadata = createLabMetadata("en");

export default function EnglishLabPage() {
  return <LabPage locale="en" />;
}
