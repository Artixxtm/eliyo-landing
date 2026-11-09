import { androidAssetLinks, associationResponse } from "@/lib/mobile-associations";

export const dynamic = "force-dynamic";

export function GET() {
  const links = androidAssetLinks();
  return associationResponse(links, links.length > 0);
}
