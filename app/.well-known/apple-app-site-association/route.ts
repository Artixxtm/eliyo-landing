import { appleAppSiteAssociation, associationResponse } from "@/lib/mobile-associations";

export const dynamic = "force-dynamic";

export function GET() {
  return associationResponse(appleAppSiteAssociation);
}
