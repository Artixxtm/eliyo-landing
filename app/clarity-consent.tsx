"use client";

import Clarity from "@microsoft/clarity";
import { useEffect, useState } from "react";

const CONSENT_KEY = "eliyo-cookie-consent";
let clarityStarted = false;

function startClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

  if (!projectId || clarityStarted) return;

  Clarity.init(projectId);
  Clarity.consentV2({
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
  clarityStarted = true;
}

export function ClarityConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_KEY);

    if (consent === "accepted") {
      startClarity();
      return;
    }

    if (consent !== "declined") {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function chooseConsent(consent: "accepted" | "declined") {
    window.localStorage.setItem(CONSENT_KEY, consent);
    if (consent === "accepted") startClarity();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-consent" aria-label="Cookie consent" aria-live="polite">
      <span>We use cookies</span>
      <div className="cookie-consent__actions">
        <button type="button" onClick={() => chooseConsent("accepted")}>Accept</button>
        <button type="button" className="cookie-consent__decline" onClick={() => chooseConsent("declined")}>Decline</button>
      </div>
    </aside>
  );
}
