import type { Locale } from "./site-copy";
import { privacyPl, termsPl } from "./legal-content-pl";
import { privacyRu, termsRu } from "./legal-content-ru";
import { privacyUk, termsUk } from "./legal-content-uk";

export type LegalSection = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  link?: { href: string; label: string };
};

export type LegalDocument = {
  title: string;
  updated: string;
  intro: readonly string[];
  sections: readonly LegalSection[];
};

const privacyEn: LegalDocument = {
  title: "Privacy Policy",
  updated: "Last updated: 07.10.2026",
  intro: [
    "Eliyo is operated by Artem Naumenko, an individual based in Poland.",
    "Contact: eliyo.app@gmail.com",
    "For the purposes of applicable data protection law, Artem Naumenko is the controller of personal data processed through Eliyo, except where another provider acts as an independent controller for its own services.",
  ],
  sections: [
    {
      heading: "1. Scope of this Privacy Policy",
      paragraphs: ["This Privacy Policy explains how personal data is collected, used, stored and shared when you use the Eliyo mobile application, website, account, support features and paid services. Eliyo is intended to be available internationally where the app and relevant providers are supported. Features, subscriptions and integrations may vary by country, platform, vehicle and region."],
    },
    {
      heading: "2. Account and profile information",
      paragraphs: ["When you create or use an Eliyo account, we may process your email address, display name, language and locale, profile image, authentication identifiers, account timestamps, confirmation that you are at least 18 and the confirmation timestamp, and security information. Authentication may use email and password, Google Sign-In or Sign in with Apple. OAuth providers may share limited profile information after you authorize the connection. Eliyo does not receive your Google or Apple password."],
    },
    {
      heading: "3. Vehicle information",
      paragraphs: ["When you add or manage a vehicle, we may process its make, model, year, nickname, VIN, specifications, mileage, photographs, maintenance schedules, service history, expenses, ownership-related dates, reminders and other information you associate with it. VIN and vehicle details may be sent to vehicle-information services when needed to identify or describe the vehicle."],
    },
    {
      heading: "4. Maintenance, mileage and history",
      paragraphs: ["Eliyo may process mileage updates, maintenance intervals, completed services, inspection, insurance or registration dates, expenses, notes and reminders. We use this information to organize the vehicle history and show items that may require attention."],
    },
    {
      heading: "5. Documents, images and uploaded files",
      paragraphs: [
        "You may choose to upload service records, receipts, invoices, insurance documents, registration or inspection records, odometer photographs, vehicle photographs and other vehicle-related files. Documents are optional, and Eliyo can be used without uploading them.",
        "Uploaded files may contain personal information about you or other people. Upload only information you are entitled to use and that is reasonably necessary for the relevant feature. Private documents are stored using restricted storage and controlled access. Eliyo is not designed as an end-to-end encrypted document vault. PDFs are rendered inside the app without sending private document URLs to Google Docs Viewer.",
      ],
    },
    {
      heading: "6. Scanning, OCR and extraction",
      paragraphs: ["If you use scanning or extraction features, Eliyo may process images or documents to identify odometer values, service dates, maintenance work, costs, vehicle details and document categories. Extracted information may be presented for review before it is saved. Automated extraction may be inaccurate, and you remain responsible for confirming important information."],
    },
    {
      heading: "7. Eliyo Assistant and AI features",
      paragraphs: [
        "When you use an AI-supported feature, we may process your prompt, relevant selected-vehicle information, mileage, maintenance and service history, files you choose to include, conversation context, generated responses and technical information needed to operate and secure the feature. Eliyo may provide selected vehicle context automatically so the Assistant can answer questions about your car.",
        "Depending on the feature and processing path, data may be processed by Google Gemini, Groq or Cloudflare AI. Google Gemini is used for Assistant, vision, search grounding and speech generation. Groq is used for Assistant and vision fallback and speech recognition. Cloudflare AI may convert a PDF to text when document processing follows the Groq path. Not every provider receives every request. Information is sent only to the provider used for the relevant feature. Provider-side processing, operational retention and secondary use are governed by the applicable production configuration and contractual terms.",
        "Before Eliyo sends personal data to a third-party AI provider, the app presents an AI data disclosure and asks for your explicit permission. You can decline AI processing and continue using Eliyo’s non-AI core features. You can later withdraw this permission through the AI & privacy controls in Eliyo settings. Withdrawing permission prevents future AI processing but does not affect processing that occurred lawfully before withdrawal.",
        "AI results may be cached briefly for reliability, duplicate prevention and usage management. Eliyo does not use AI to make decisions that produce legal or similarly significant effects about you.",
      ],
    },
    {
      heading: "8. Voice features",
      paragraphs: ["If you use voice functionality, audio may be processed for speech recognition, transcription, generating a response or text-to-speech output. Audio or transcribed text may be sent to the provider used for that request. Microphone access is requested only when needed and remains subject to your device permissions."],
    },
    {
      heading: "9. Local app data",
      paragraphs: ["Some information may remain on your device, including recent conversations, cached interface data, AI attachments, preferences, consent and session information. Local Eliyo conversation data and indexed AI attachments associated with the account are cleaned as part of account deletion. Device-level data may also be removed by uninstalling the app or clearing its storage."],
    },
    {
      heading: "10. Subscriptions and purchases",
      paragraphs: ["Subscriptions are processed through the Apple App Store or Google Play. Eliyo may receive subscription status, product or entitlement identifiers, renewal and expiration information and an app-specific subscriber identifier from RevenueCat and the applicable store. Eliyo does not receive or store your full payment card details. Apple and Google process purchases under their own terms and privacy policies."],
    },
    {
      heading: "11. Support and feedback",
      paragraphs: ["If you contact support or send feedback, we may process your email, message, optional screenshots, app version, platform, operating system, device model, locale, optional vehicle identifier and relevant diagnostic details. Support is handled directly by Eliyo, and in-app support records are stored using Eliyo’s backend services."],
    },
    {
      heading: "12. Operational and security information",
      paragraphs: ["Eliyo and its infrastructure providers may process limited technical and operational information such as IP address, request timestamps, browser or device headers, request status, error details, operation duration, backend and security logs, AI usage and quota information, subscription events and authentication events. We use this information to operate, secure and troubleshoot the service. Eliyo does not use an advertising SDK or build advertising profiles from app activity."],
    },
    {
      heading: "13. Website information and analytics",
      paragraphs: [
        "Vercel hosts and delivers the Eliyo website and may process standard technical information such as IP address, browser and device type, requested pages, approximate region and security logs.",
        "Microsoft Clarity starts only after you accept analytics cookies. If accepted, Clarity may collect page activity, device information, clicks, scrolling, mouse movements and session or interaction recordings used for behavior analytics. Advertising storage is disabled in Eliyo’s consent configuration. Your choice is stored on your device and can be changed or withdrawn through Cookie settings. Declining analytics does not prevent use of the website.",
      ],
    },
    {
      heading: "14. How we obtain and use information",
      paragraphs: ["We obtain information directly from you, from your use of Eliyo, from authentication providers, from vehicle-information services after you submit vehicle details, from subscription providers and app stores, from your device when you grant permission, and from service providers operating on our behalf."],
      bullets: [
        "Create and secure your account.",
        "Provide the app, website and requested features.",
        "Store and organize vehicle information, records and reminders.",
        "Provide Assistant, OCR and voice features.",
        "Manage subscriptions and feature access.",
        "Provide support, prevent abuse and diagnose technical problems.",
        "Comply with legal obligations and protect legal rights.",
        "Provide website analytics where you have consented.",
      ],
    },
    {
      heading: "15. Legal bases",
      paragraphs: [
        "Where the GDPR, UK GDPR or similar law applies, we rely on performance of a contract to create and manage your account, store the vehicle information and content you choose to add, provide requested Eliyo features and manage subscription access. We rely on legitimate interests to secure the service, prevent fraud and abuse, maintain operational logs, troubleshoot problems, provide support, improve reliability and protect legal rights, provided those interests are not overridden by your rights and freedoms.", "We rely on consent where required, including before sending personal data to third-party AI providers, for optional Microsoft Clarity analytics and for device permissions that require consent. We rely on legal obligations where processing or retention is required for tax, accounting, consumer-protection, data-protection, lawful-request or similar compliance purposes.",
        "You may withdraw consent at any time. Withdrawal does not affect processing that was lawful before consent was withdrawn.",
      ],
    },
    {
      heading: "16. Service providers and recipients",
      bullets: [
        "Supabase for authentication, database, private file storage and backend functions.",
        "Google and Apple for authentication and app distribution.",
        "RevenueCat for subscription entitlement and purchase-status management.",
        "Google Gemini, Groq and Cloudflare AI for Assistant, vision, document or speech processing, depending on the feature and processing path.",
        "NHTSA vPIC for VIN and vehicle-information lookup.",
        "Vercel for website hosting and delivery.",
        "Microsoft Clarity for consent-based website analytics.",
        "Resend for authentication and transactional email delivery.",
        "Professional advisers, authorities or other recipients where required by law or necessary to protect legal rights.",
      ],
      paragraphs: ["Providers receive only information reasonably necessary for their function. Third parties that receive user data must provide the same or equivalent protection described in this Privacy Policy and required by applicable platform rules. Where a provider processes personal data on Eliyo’s behalf, we require it to use the data only for the purpose for which it was provided and in accordance with applicable data-protection law. Information may also be disclosed as part of a merger, acquisition, restructuring or transfer of the Eliyo product, subject to applicable law and appropriate notice."],
    },
    {
      heading: "17. International transfers",
      paragraphs: ["Eliyo is operated from Poland, but some providers may process information in other countries. Where required, transfers are supported by adequacy decisions, Standard Contractual Clauses, the UK International Data Transfer Addendum or another recognized mechanism. Protections in a destination country may differ from those in your country."],
    },
    {
      heading: "18. Retention",
      paragraphs: [
        "We retain personal data only as long as necessary for the purpose described in this Policy. Account and vehicle data is generally retained while your account is active. Documents and vehicle records remain until you delete them or the account. Support messages are retained while needed to resolve the request and handle related follow-up. Operational and security logs are retained only as long as reasonably necessary to investigate incidents, prevent abuse and maintain service reliability. Short-lived AI cache entries expire or are removed when they are no longer needed for reliability, duplicate prevention or usage management.",
        "Subscription, transaction and analytics records may also be subject to store, provider and legal retention requirements. Deleted information may remain temporarily in provider backups or recovery systems and is deleted or anonymized through the applicable backup and retention process. Limited information may be retained where required for legal, security, fraud-prevention, tax, accounting or dispute-resolution purposes.",
      ],
    },
    {
      heading: "19. Exporting and deleting your data",
      paragraphs: [
        "Eliyo provides account data export and account deletion. An export may include structured account, vehicle and activity information, but may not contain every raw file in its original format.",
        "Account deletion removes or schedules removal of profile data, vehicles and related records, stored documents and images, cloud files, local Eliyo conversation data and indexed attachments, RevenueCat subscriber data where supported, and connected authentication credentials and tokens. Some information may remain where required by law or necessary for security, fraud prevention or legal claims.",
        "Deleting your Eliyo account does not cancel an Apple App Store or Google Play subscription. Cancel any active subscription separately through the store account used to purchase it. If you cannot access the app, use the external account-deletion page below.",
      ],
      link: { href: "/delete-account", label: "Open the Eliyo account-deletion page" },
    },
    {
      heading: "20. Your rights",
      paragraphs: ["Depending on your location, you may have rights to access, correct, delete, restrict or object to processing, receive portable data, withdraw consent and complain to a data-protection authority. In Poland, you may contact the President of the Personal Data Protection Office, UODO. You may also contact the authority where you live or work. Requests can be sent to eliyo.app@gmail.com. We may need to verify your identity, and rights may be limited where an exemption applies."],
    },
    {
      heading: "21. Security",
      paragraphs: ["We use reasonable measures such as authenticated access, restricted database and storage permissions, private file storage, controlled file access, secure network transport and provider access controls. No service can guarantee absolute security. Eliyo is not an end-to-end encrypted storage service, and authorized systems and providers may process information where necessary to provide a requested feature. Report suspected compromise to eliyo.app@gmail.com."],
    },
    {
      heading: "22. Children",
      paragraphs: ["You must be at least 18 years old to create or use an Eliyo account. Eliyo is not directed to anyone under 18. If we learn that an account was created or used by someone under 18, we may suspend or delete the account and associated information."],
    },
    {
      heading: "23. Sale of data and advertising",
      paragraphs: ["Eliyo does not sell personal data. Eliyo does not use personal data for third-party behavioral advertising and does not use an advertising SDK in the mobile application."],
    },
    {
      heading: "24. Device permissions",
      paragraphs: ["Depending on the feature you use, Eliyo may request access to the camera to photograph a VIN, odometer, vehicle or document; photos and files to select vehicle images, documents or support attachments that you choose to upload; the microphone to record a voice request; and notifications to schedule maintenance and important-date reminders.", "Permissions are requested in context and can be changed in your device settings. As of the date of this Privacy Policy, the current release does not use precise or background location, Bluetooth tracking or continuous trip tracking. Reminder notifications are scheduled locally, and Eliyo does not currently collect a remote push-notification token."],
    },
    {
      heading: "25. Changes and contact",
      paragraphs: ["We may update this Privacy Policy when Eliyo, its providers or applicable requirements change. The updated version will show a revised date, and we will provide additional notice or request consent where required. Privacy, legal, support and data requests may be sent to Artem Naumenko, operator of Eliyo, Poland, at eliyo.app@gmail.com. Postal address: Wojciecha Bogusławskiego 6, lok. 11, 26-610 Radom, Poland."],
    },
  ],
};

const termsEn: LegalDocument = {
  title: "Terms of Use",
  updated: "Last updated: 07.10.2026",
  intro: [
    "These Terms of Use govern your access to and use of Eliyo.",
    "Eliyo is operated by Artem Naumenko, an individual based in Poland.",
    "By creating an account or using Eliyo, you agree to these Terms and acknowledge the Privacy Policy. If you do not agree, do not use Eliyo.",
  ],
  sections: [
    { heading: "1. Eligibility", paragraphs: ["You must be at least 18 years old, legally permitted to use Eliyo in your country and capable of entering into these Terms. Eliyo is not directed to anyone under 18."] },
    { heading: "2. What Eliyo provides", paragraphs: ["Eliyo helps organize mileage, maintenance, service history, expenses, vehicle documents, reminders and vehicle-related questions. Features may vary by subscription, device, country, vehicle, provider availability and app version. Eliyo does not guarantee that every feature or integration is available for every user or vehicle."] },
    { heading: "3. Your account", paragraphs: ["You are responsible for accurate account information, protecting access to your account, activity performed through it and notifying us about suspected unauthorized access, except to the extent that unauthorized activity results from Eliyo’s failure to use reasonable security measures. You may not use another person’s identity or an account you are not authorized to access."] },
    { heading: "4. Vehicle information and reminders", paragraphs: ["Eliyo depends on information you provide, including mileage, service history, vehicle details and document dates. You are responsible for keeping it accurate and current. Maintenance dates, estimates and reminders may be incomplete, delayed or inaccurate. Eliyo does not replace your vehicle manual, manufacturer instructions, inspections or advice from a qualified mechanic. Do not delay urgent maintenance, repairs or safety checks because of information shown by Eliyo."] },
    { heading: "5. AI, OCR and voice features", paragraphs: ["AI-supported answers, document extraction, odometer recognition, speech recognition and text-to-speech can be incorrect, incomplete or misleading. Review important information before relying on it or saving it. Eliyo does not provide professional mechanical, legal, insurance or safety advice and must not be used as an emergency service."] },
    { heading: "6. Your content", paragraphs: ["You retain ownership of information and files you submit. You grant us a limited, non-exclusive license to host, copy, process, transform and transmit that content only as needed to operate Eliyo, provide requested features, maintain security, provide support and comply with law. The license ends when content is deleted, except for temporary backups and legal retention. You confirm that you have the right to use uploaded content and will not upload malicious or unlawful material. You should not upload sensitive personal information that is unrelated to Eliyo’s intended vehicle, document or support features.", "If you voluntarily send product ideas, suggestions or feedback, Eliyo may use them to improve the service without an obligation to compensate you. This does not transfer ownership of your vehicle information, documents or other personal content."] },
    { heading: "7. Free and paid features", paragraphs: ["Eliyo may offer a free version and paid plans, including Eliyo+. Plans may differ in vehicle limits, Assistant usage, scanning quotas, voice features, automation and other access. Current features, limits, prices and billing periods are shown in the app and purchase screen before purchase.", "We may modify plan features where reasonably necessary for security, legal compliance, provider changes, technical development or improvement of the service. We will not make a material adverse change to an active paid subscription except as permitted by applicable law. Where required, we will provide advance notice and any applicable option to cancel or terminate before the change takes effect.", "Changes to subscription pricing are handled through the applicable app store and are subject to its purchase and consent requirements and applicable consumer law."] },
    { heading: "8. Subscriptions", paragraphs: ["Paid subscriptions are purchased through the Apple App Store or Google Play. The purchase screen shows the price, billing period, included entitlement, renewal terms and any offer conditions. Unless stated otherwise, subscriptions renew automatically until cancelled. Manage or cancel through the store account used to purchase. Deleting Eliyo or your Eliyo account does not cancel a store subscription. Cancellation normally takes effect at the end of the current billing period. The store used for the purchase handles billing, cancellation and refund requests under its rules. Subscription expiry may restrict paid features but does not automatically delete your records.", "Nothing in these Terms limits any statutory cancellation, withdrawal or refund rights available to you under applicable consumer law."] },
    { heading: "9. Acceptable use", bullets: ["Do not use Eliyo unlawfully or violate another person’s rights.", "Do not access another user’s account or data.", "Do not interfere with security, probe infrastructure or upload malicious code.", "Do not abuse AI, scanning or subscription systems or bypass access controls.", "Do not reverse engineer Eliyo except where law expressly permits it.", "Do not use automation that places an unreasonable load on the service."], paragraphs: ["We may restrict or suspend access where reasonably necessary to protect users, providers or the service."] },
    { heading: "10. Third-party services", paragraphs: ["Eliyo relies on providers for authentication, cloud storage, AI processing, vehicle lookup, subscriptions, app distribution, website hosting and consent-based analytics. Their own terms and privacy policies may apply. We are not responsible for third-party services outside our reasonable control, except where responsibility cannot legally be excluded."] },
    { heading: "11. Eliyo intellectual property", paragraphs: ["The Eliyo app, website, branding, mascot, interface, code and original content are owned by or licensed to the operator. You receive a personal, limited, revocable, non-exclusive and non-transferable right to use Eliyo for its intended purpose. These Terms do not transfer ownership of Eliyo intellectual property."] },
    { heading: "12. Availability and changes", paragraphs: ["We aim to keep Eliyo available and reliable but do not guarantee uninterrupted or error-free operation. Features may change for the reasons and subject to the safeguards described in Section 7, including technical development, security, provider availability and legal or platform requirements. We may suspend Eliyo for maintenance, security or circumstances outside our reasonable control. Where required by applicable law, we will provide clear advance notice and any applicable right to cancel or terminate before a material negative change to an active paid service takes effect."] },
    { heading: "13. Account deletion and suspension", paragraphs: ["You may request deletion through Eliyo or the external account-deletion page. Deletion removes or schedules removal of associated Eliyo data, subject to legal obligations, security needs and provider backups. Deleting your Eliyo account does not cancel an Apple App Store or Google Play subscription, which must be cancelled separately through the store account used to purchase it. We may suspend or terminate access for a material violation, a security or legal risk, invalid payment entitlement or a legal or platform requirement. Where reasonable and required, we will provide notice and an opportunity to resolve the issue."], link: { href: "/delete-account", label: "Open the Eliyo account-deletion page" } },
    { heading: "14. Privacy", paragraphs: ["Personal data is handled as described in the Eliyo Privacy Policy, including the providers involved and your options for access, export and deletion."], link: { href: "/privacy", label: "Read the Eliyo Privacy Policy" } },
    { heading: "15. Disclaimers", paragraphs: ["Eliyo is a vehicle information and organization tool. To the extent permitted by law, we do not guarantee that all information will be complete, current or error-free, or that Eliyo will prevent mechanical failures, penalties, missed renewals or other losses. You remain responsible for operating and maintaining your vehicle safely and lawfully. Nothing in these Terms excludes statutory warranties or consumer protections that cannot legally be excluded."] },
    { heading: "16. Limitation of liability", paragraphs: ["To the extent permitted by law, Eliyo is not liable for losses that were not a reasonably foreseeable consequence of our breach, or losses caused by inaccurate information you provide, unverified AI or OCR output, ignored manufacturer or professional guidance, unauthorized access caused by failure to protect credentials, or third-party services outside our reasonable control. Nothing limits liability for fraud, intentional misconduct, death or personal injury, gross negligence where applicable, or any liability or consumer right that cannot legally be limited."] },
    { heading: "17. Apple App Store terms", paragraphs: ["If you obtain Eliyo through the Apple App Store, these Terms are between you and the operator, not Apple. The Apple Standard EULA applies to the licence of the iOS application unless a separate custom EULA is provided through the App Store. Eliyo, not Apple, is responsible for providing maintenance and support for the application, except to the extent otherwise required by applicable law. Apple may provide refunds only under its applicable rules. Apple and its subsidiaries are third-party beneficiaries of the relevant provisions. Your use must also comply with App Store terms."] },
    { heading: "18. Google Play terms", paragraphs: ["If you obtain Eliyo through Google Play, these Terms are between you and the operator, not Google. Google is not responsible for maintaining Eliyo. Purchases, cancellation and refunds are also subject to Google Play policies, and your use must comply with Google Play terms."] },
    { heading: "19. Governing law and consumer rights", paragraphs: ["These Terms are governed by Polish law. If you are a consumer, this does not remove mandatory rights or protections in the country where you habitually reside, or require you to bring a claim only in Poland where applicable law permits another jurisdiction. Before formal proceedings, you may contact eliyo.app@gmail.com so we can try to resolve the issue."] },
    { heading: "20. Language", paragraphs: ["The English version is canonical. Localized versions are provided for convenience and should preserve the same legal meaning. Mandatory local-language requirements and rights remain unaffected."] },
    { heading: "21. Changes and contact", paragraphs: ["We may update these Terms when Eliyo, its subscriptions, providers or legal obligations change. The updated version will show a revised date, with additional notice where a change materially affects your rights or where law requires it. Material changes will not retroactively reduce rights already acquired during an existing paid period. Where applicable law requires your consent to a material change, the change will not take effect for you unless that consent is obtained.", "Questions may be sent to Artem Naumenko, operator of Eliyo, Poland, at eliyo.app@gmail.com. Postal address: Wojciecha Bogusławskiego 6, lok. 11, 26-610 Radom, Poland."] },
  ],
};

export const legalDocuments: Record<Locale, { privacy: LegalDocument; terms: LegalDocument }> = {
  en: { privacy: privacyEn, terms: termsEn },
  uk: { privacy: privacyUk, terms: termsUk },
  pl: { privacy: privacyPl, terms: termsPl },
  ru: { privacy: privacyRu, terms: termsRu },
};
