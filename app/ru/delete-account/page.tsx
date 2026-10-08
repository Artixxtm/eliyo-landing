import { DeleteAccountPage } from "../../resource-pages";
import { createResourceMetadata } from "../../resource-metadata";

export const metadata = createResourceMetadata("delete-account", "ru");
export default function Page() { return <DeleteAccountPage locale="ru" />; }
