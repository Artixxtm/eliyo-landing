import { DeleteAccountPage } from "../../resource-pages";
import { createResourceMetadata } from "../../resource-metadata";

export const metadata = createResourceMetadata("delete-account", "uk");
export default function Page() { return <DeleteAccountPage locale="uk" />; }
