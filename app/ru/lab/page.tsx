import { createLabMetadata, LabPage } from "../../lab-page";

export const metadata = createLabMetadata("ru");

export default function RussianLabPage() {
  return <LabPage locale="ru" />;
}
