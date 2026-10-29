import type { Metadata } from "next";
import { AdminDashboard } from "./admin-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eliyo Control",
  description: "Private Eliyo operations console.",
  robots: { index: false, follow: false, nocache: true, noarchive: true },
};

export default function Page() {
  return <AdminDashboard />;
}
