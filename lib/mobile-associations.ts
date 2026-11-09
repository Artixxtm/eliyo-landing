const PLAY_SIGNING_FINGERPRINT_PATTERN = /^(?:[0-9A-F]{2}:){31}[0-9A-F]{2}$/;

export const appleAppSiteAssociation = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "TVH7N73K2H.app.eliyo.mobile",
        paths: ["/invite/*"],
      },
    ],
  },
};

export function androidAssetLinks() {
  const fingerprints = (process.env.ANDROID_PLAY_APP_SIGNING_SHA256 ?? "")
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter((value) => PLAY_SIGNING_FINGERPRINT_PATTERN.test(value));

  if (!fingerprints.length) return [];

  return [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "app.eliyo.mobile",
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ];
}

export function associationResponse(body: unknown, cache = true) {
  return Response.json(body, {
    headers: {
      "Cache-Control": cache ? "public, max-age=3600" : "no-store",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
