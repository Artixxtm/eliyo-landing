"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "eliyo-cookie-consent";
const CLARITY_SCRIPT_ID = "eliyo-clarity";

function startClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

  if (!projectId || document.getElementById(CLARITY_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  script.referrerPolicy = "strict-origin-when-cross-origin";
  document.head.appendChild(script);
}

export function ClarityConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_KEY);

    if (consent === "accepted") {
      startClarity();
      return;
    }

    if (consent !== "declined") setVisible(true);
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
