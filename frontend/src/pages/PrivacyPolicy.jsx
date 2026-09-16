import Seo from "../components/seo/Seo";

// Sticky table-of-contents sidebar — each entry anchors to a section below.
const POLICY_SECTIONS = [
  { id: "scope", label: "1. Scope of This Policy" },
  { id: "who-we-are", label: "2. Who We Are & Contact Info" },
  { id: "core-principles", label: "3. No Ads, No Tracking" },
  { id: "information-we-collect", label: "4. Information We Collect" },
  { id: "device-permissions", label: "5. Mobile Device Permissions" },
  { id: "store-compliance", label: "6. App Store Compliance" },
  { id: "data-deletion", label: "7. Account & Data Deletion" },
  { id: "third-parties", label: "8. Third-Party Providers" },
  { id: "retention", label: "9. Data Retention Policy" },
  { id: "security", label: "10. Data Security" },
  { id: "legal-rights", label: "11. Your Legal Privacy Rights" },
  { id: "children", label: "12. Children’s Privacy" },
  { id: "changes", label: "13. Changes to This Policy" },
  { id: "grievance", label: "14. Contact & Grievance Officer" },
];

// Rows for the mobile-permissions table (Section 5).
const PERMISSION_ROWS = [
  {
    permission: "Notifications",
    platform: "iOS & Android",
    purpose:
      "To send critical operational alerts, account updates, or service messages (e.g., via APNs / FCM).",
    mandatory: "Optional (Revocable anytime in Settings)",
  },
  {
    permission: "Camera",
    platform: "iOS & Android",
    purpose:
      "Used solely if you choose to scan a QR code, capture documents, or upload a profile image directly within the App.",
    mandatory: "Optional (Only accessed when feature is used)",
  },
  {
    permission: "Photos / Storage",
    platform: "iOS & Android",
    purpose:
      "Allows you to select and upload specific documents or images required for app workflows.",
    mandatory: "Optional (Only accessed when feature is used)",
  },
  {
    permission: "Network State / Internet",
    platform: "iOS & Android",
    purpose:
      "Required to connect to our secure servers and synchronize your data.",
    mandatory: "Required for online functionality",
  },
  {
    permission: "Biometrics (Face ID / Fingerprint)",
    platform: "iOS & Android",
    purpose:
      "Used strictly for local device authentication to unlock the App. Biometric data is processed entirely on-device by Apple Secure Enclave / Android Keystore and is never accessible or transmitted to our servers.",
    mandatory: "Optional",
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read how Innobles collects, uses, protects and deletes your personal data across our website and iOS/Android apps. No ads, no tracking, no data selling."
        keywords="Innobles privacy policy, data protection, DPDP Act, GDPR, no tracking, no ads, account deletion"
        path="/privacy-policy"
      />

      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-24">
          <p className="eyebrow mb-4 justify-center">Privacy Policy</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Your privacy is <span className="text-gradient">built in.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
            Innobles runs a strict no-ads, no-tracking platform. Here is exactly
            how we collect, use, protect and delete your information.
          </p>
          <p className="mt-5 text-sm font-medium text-white/40">
            Last Updated: September 16, 2026
          </p>
        </div>
      </section>

      {/* Content — sticky TOC (desktop) + full policy */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Table of contents */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav
              className="sticky top-24 rounded-2xl border border-line bg-slate-50 p-6"
              aria-label="Privacy Policy sections"
            >
              <p className="eyebrow">On this page</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {POLICY_SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block font-medium leading-snug text-slate-600 transition-colors hover:text-[#F59E0B]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Policy body */}
          <article className="content-rich-body lg:col-span-9">
            <p>
              Welcome to <strong>Innobles</strong> ("we," "our," "us"). Innobles
              is a technology company operating the website{" "}
              <a
                href="https://innobles.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://innobles.com/
              </a>{" "}
              and our official mobile applications distributed through the{" "}
              <strong>Apple App Store</strong> and the{" "}
              <strong>Google Play Store</strong> (collectively, the "Services"
              or "Apps").
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose,
              protect, and delete your information when you visit our website or
              download and use our mobile applications on iOS and Android
              devices.
            </p>

            {/* 1. Scope */}
            <section id="scope" className="mt-12 scroll-mt-24">
              <h2>1. Scope of This Policy</h2>
              <p>This Privacy Policy applies to:</p>
              <ul>
                <li>
                  <strong>Our website:</strong>{" "}
                  <a
                    href="https://innobles.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://innobles.com/
                  </a>
                </li>
                <li>
                  <strong>Our mobile applications</strong> published under the
                  developer account of Innobles on the{" "}
                  <strong>Apple App Store</strong> (iOS/iPadOS) and{" "}
                  <strong>Google Play Store</strong> (Android).
                </li>
                <li>
                  <strong>Any related direct communications</strong>, customer
                  support, or technology services provided by Innobles.
                </li>
              </ul>
            </section>

            {/* 2. Who we are */}
            <section id="who-we-are" className="mt-12 scroll-mt-24">
              <h2>2. Who We Are and Developer Contact Information</h2>
              <p>
                Innobles is the developer of the Apps and the Data Controller
                (or Data Fiduciary under the Digital Personal Data Protection
                Act, 2023).
              </p>
              <ul>
                <li>
                  <strong>Entity / Developer Name:</strong> Innobles
                </li>
                <li>
                  <strong>Head Office Address:</strong> X-15, Hauz Khas, New
                  Delhi – 110016, India
                </li>
                <li>
                  <strong>Official Privacy Email:</strong>{" "}
                  <a href="mailto:info@innobles.com">info@innobles.com</a>
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://innobles.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://innobles.com/
                  </a>
                </li>
              </ul>
            </section>

            {/* 3. Core principles */}
            <section id="core-principles" className="mt-12 scroll-mt-24">
              <h2>3. Our Core Privacy Principles: No Ads, No Tracking</h2>
              <p>To ensure total transparency:</p>
              <ul>
                <li>
                  <strong>No Third-Party Advertising:</strong> Our website and
                  mobile apps do <em>not</em> display third-party advertisements
                  or integrate advertising SDKs.
                </li>
                <li>
                  <strong>No Cross-App Tracking:</strong> We do <em>not</em>{" "}
                  track you across third-party apps or websites, and we do{" "}
                  <em>not</em> access or link your Apple Advertising Identifier
                  (IDFA) or Google Advertising ID (GAID) for advertising or
                  profiling purposes.
                </li>
                <li>
                  <strong>Zero Web Tracking Cookies:</strong> Our website does{" "}
                  <em>not</em> deploy tracking, marketing, or profiling cookies.
                </li>
                <li>
                  <strong>No Sale of Personal Data:</strong> We do{" "}
                  <em>not</em> sell, rent, or trade your personal data to data
                  brokers or any third party.
                </li>
              </ul>
            </section>

            {/* 4. Information we collect */}
            <section id="information-we-collect" className="mt-12 scroll-mt-24">
              <h2>4. Information We Collect</h2>
              <p>
                We adhere strictly to the principle of data minimization and
                collect only what is essential for the functionality and
                security of our Services.
              </p>

              <h3>A. Information You Provide Directly</h3>
              <ul>
                <li>
                  <strong>Account &amp; Profile Data:</strong> If the App
                  requires or allows an account, we may collect your name,
                  business email address, phone number, organization name, and
                  authentication credentials.
                </li>
                <li>
                  <strong>Support &amp; Inquiries:</strong> When you email us at{" "}
                  <a href="mailto:info@innobles.com">info@innobles.com</a>{" "}
                  or submit a message through an in-app form, we receive the
                  content of your communication and your contact information.
                </li>
              </ul>

              <h3>
                B. Automatically Collected Device and Technical Information
              </h3>
              <p>
                When you use our mobile apps or website, certain basic technical
                data is processed automatically to ensure operational
                performance:
              </p>
              <ul>
                <li>
                  <strong>Device Information:</strong> Device model, operating
                  system version (iOS/Android), system language, and unique
                  device hardware identifiers strictly used for device-level
                  session authentication.
                </li>
                <li>
                  <strong>Diagnostics &amp; Performance (Crash Logs):</strong>{" "}
                  Application crash stack traces, performance metrics, and error
                  reports to diagnose technical glitches, improve stability, and
                  deliver bug fixes.
                </li>
                <li>
                  <strong>Network &amp; Server Logs:</strong> IP address (used
                  for secure routing and DDoS mitigation), network type
                  (Wi-Fi/cellular), and timestamps of requests.
                </li>
              </ul>
            </section>

            {/* 5. Device permissions */}
            <section id="device-permissions" className="mt-12 scroll-mt-24">
              <h2>5. Mobile Device Permissions (iOS &amp; Android)</h2>
              <p>
                Our Apps only request system permissions when strictly necessary
                to provide specific features. You are prompted to grant these
                permissions at runtime, and you can revoke them at any time
                through your device’s operating system settings:
              </p>

              <div className="overflow-x-auto rounded-xl border border-line bg-white">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
                      <th scope="col" className="px-4 py-3">
                        Permission
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Platform
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Purpose &amp; Usage
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Is It Mandatory?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PERMISSION_ROWS.map((row) => (
                      <tr
                        key={row.permission}
                        className="border-t border-line align-top"
                      >
                        <td className="px-4 py-3 font-semibold text-ink">
                          {row.permission}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {row.platform}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {row.purpose}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {row.mandatory}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                <strong>Note:</strong> We never access your camera, photo
                library, or files in the background without your explicit
                action.
              </p>
            </section>

            {/* 6. App Store compliance */}
            <section id="store-compliance" className="mt-12 scroll-mt-24">
              <h2>6. App Store Specific Compliance</h2>

              <h3>A. Apple App Store Compliance (Guidelines 5.1.1 &amp; 5.1.2)</h3>
              <ul>
                <li>
                  <strong>App Tracking Transparency (ATT):</strong> Innobles
                  does <em>not</em> track users across other companies’ apps or
                  websites for targeted advertising. Therefore, our App does not
                  request tracking permission under iOS ATT because no tracking
                  occurs.
                </li>
                <li>
                  <strong>Privacy Nutrition Labels:</strong> In the App Store
                  privacy details, our data collection corresponds strictly to{" "}
                  <em>App Functionality</em>, <em>Security/Fraud Prevention</em>
                  , and <em>Analytics/Diagnostics</em> (not linked to advertising
                  or cross-app tracking).
                </li>
              </ul>

              <h3>B. Google Play Data Safety Section Compliance</h3>
              <ul>
                <li>
                  <strong>Data Encryption in Transit:</strong> All communications
                  between our Apps, website, and backend servers are encrypted
                  using modern Transport Layer Security (HTTPS/TLS 1.2+).
                </li>
                <li>
                  <strong>Data Collection vs. Data Sharing:</strong> Data
                  collected is strictly used to deliver core app functionality.
                  We do <em>not</em> share user data with third parties for
                  marketing or advertising.
                </li>
                <li>
                  <strong>Commitment to Google Play Families Policy:</strong> If
                  our app is accessed by a general audience, it complies with
                  Google Play’s requirements ensuring safe data handling.
                </li>
              </ul>
            </section>

            {/* 7. Account & data deletion */}
            <section id="data-deletion" className="mt-12 scroll-mt-24">
              <h2>7. Account and Data Deletion Mechanism (Mandatory)</h2>
              <p>
                In compliance with{" "}
                <strong>Apple App Store Review Guideline 5.1.1(v)</strong> and
                the <strong>Google Play Account Deletion Policy</strong>, any
                user with an account in our App has the direct right to delete
                their account and all associated personal data.
              </p>

              <h3>How to Delete Your Account and Data</h3>
              <p>
                You have two straightforward methods to delete your account:
              </p>
              <ol>
                <li>
                  <strong>In-App Deletion:</strong> Open the Innobles App.
                  Navigate to <em>Settings</em> (or <em>Profile</em>) →{" "}
                  <em>Account Security</em> → Tap <em>"Delete Account"</em>.
                  Confirm your choice. Your account credentials, profile
                  details, and associated data will be immediately deactivated
                  and scheduled for permanent purge.
                </li>
                <li>
                  <strong>Web / Email Request</strong> (without needing the app
                  installed): If you cannot access the app, you can submit a
                  deletion request by emailing{" "}
                  <a href="mailto:info@innobles.com">info@innobles.com</a>{" "}
                  with the subject line:{" "}
                  <em>"Account Deletion Request - [Your Registered Email]"</em>.
                  Our team will verify your identity and process the complete
                  deletion of your account and associated records within 7
                  business days.
                </li>
              </ol>

              <h3>What Gets Deleted vs. Retained</h3>
              <ul>
                <li>
                  <strong>Permanently Deleted:</strong> User profile, email
                  address, passwords, personal files, and preferences are wiped
                  from production databases.
                </li>
                <li>
                  <strong>Limited Statutory Retention:</strong> Minimal
                  transaction, invoicing, or security logs may be retained only
                  for the minimum period legally required by applicable
                  financial or cybersecurity regulations, after which they are
                  permanently overwritten.
                </li>
              </ul>
            </section>

            {/* 8. Third-party providers */}
            <section id="third-parties" className="mt-12 scroll-mt-24">
              <h2>8. Third-Party Service Providers and SDKs</h2>
              <p>
                We work only with vetted, enterprise-grade technology
                infrastructure providers to deliver our Services:
              </p>
              <ul>
                <li>
                  <strong>Cloud Infrastructure &amp; Hosting:</strong> Secure
                  enterprise cloud providers for server hosting and database
                  storage under strict confidentiality agreements.
                </li>
                <li>
                  <strong>Push Notification Services:</strong> Apple Push
                  Notification service (APNs) for iOS and Firebase Cloud
                  Messaging (FCM) for Android strictly for delivering functional
                  notifications.
                </li>
                <li>
                  <strong>Crash &amp; Diagnostic Services:</strong> Crash
                  reporting utilities to capture error logs and debug app faults
                  without collecting personally identifiable marketing profiles.
                </li>
              </ul>
              <p>
                These third parties process information solely on our behalf and
                under strict instructions; they are prohibited from using your
                data for any other purpose.
              </p>
            </section>

            {/* 9. Retention */}
            <section id="retention" className="mt-12 scroll-mt-24">
              <h2>9. Data Retention Policy</h2>
              <ul>
                <li>
                  <strong>Active Account Data:</strong> Maintained for as long
                  as your account remains active.
                </li>
                <li>
                  <strong>Inquiries &amp; Communications:</strong> Retained for
                  as long as necessary to address your request and maintain
                  business records.
                </li>
                <li>
                  <strong>Crash &amp; Server Logs:</strong> Retained on a rolling
                  30-to-90 day schedule and automatically expunged thereafter.
                </li>
              </ul>
            </section>

            {/* 10. Security */}
            <section id="security" className="mt-12 scroll-mt-24">
              <h2>10. Data Security</h2>
              <p>
                We implement industry-standard administrative, physical, and
                technical safeguards:
              </p>
              <ul>
                <li>
                  All data in transit is encrypted using{" "}
                  <strong>TLS 1.2 / TLS 1.3</strong>.
                </li>
                <li>
                  Sensitive data at rest is protected using industry-standard{" "}
                  <strong>AES encryption</strong>.
                </li>
                <li>
                  <strong>Multi-factor authentication (MFA)</strong> and strict
                  role-based access controls for all internal systems.
                </li>
                <li>
                  Regular security audits and vulnerability assessments.
                </li>
              </ul>
            </section>

            {/* 11. Legal rights */}
            <section id="legal-rights" className="mt-12 scroll-mt-24">
              <h2>11. Your Legal Privacy Rights</h2>
              <p>
                Depending on your country or region (e.g., India under the{" "}
                <strong>DPDP Act, 2023</strong>, the EU/EEA under the{" "}
                <strong>GDPR</strong>, or the United States under the{" "}
                <strong>CCPA/CPRA</strong>), you are entitled to:
              </p>
              <ul>
                <li>
                  <strong>Right to Access / Confirmation:</strong> Inquire what
                  personal data we hold about you and receive a copy.
                </li>
                <li>
                  <strong>Right to Correction:</strong> Update or correct any
                  inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request the permanent
                  deletion of your personal data.
                </li>
                <li>
                  <strong>Right to Restrict / Object:</strong> Object to or
                  restrict specific processing operations.
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Obtain your data in
                  an exportable, machine-readable format.
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Revoke permission
                  previously granted without affecting prior lawful processing.
                </li>
                <li>
                  <strong>Right to Nominate / Grievance Redressal:</strong>{" "}
                  Nominate an individual or lodge a complaint regarding the
                  handling of your data.
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:info@innobles.com">info@innobles.com</a>.
              </p>
            </section>

            {/* 12. Children */}
            <section id="children" className="mt-12 scroll-mt-24">
              <h2>12. Children’s Privacy</h2>
              <p>
                Our Apps and Website are intended for professional, enterprise,
                and adult users. We do not knowingly collect or solicit personal
                data from children under the age of 13 (or under 18 where
                applicable under local law such as India’s DPDP Act). If we
                discover that personal data of a minor has been submitted
                without verified parental consent, we will delete that data
                immediately.
              </p>
            </section>

            {/* 13. Changes */}
            <section id="changes" className="mt-12 scroll-mt-24">
              <h2>13. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to
                accommodate new app features, updated store policies, or
                evolving statutory requirements. Any updates will be posted on
                this page with an updated "Last Updated" timestamp, and
                significant changes will be communicated via in-app notices or
                direct email.
              </p>
            </section>

            {/* 14. Grievance officer */}
            <section id="grievance" className="mt-12 scroll-mt-24">
              <h2>14. Grievance Officer and Contact Details</h2>
              <p>
                For inquiries, support, or data privacy complaints, please
                contact our designated Grievance Officer:
              </p>
              <blockquote>
                <strong>Grievance Officer / Privacy Officer</strong>
                <br />
                Innobles
                <br />
                Head Office: X-15, Hauz Khas, New Delhi – 110016, India
                <br />
                Email:{" "}
                <a href="mailto:info@innobles.com">info@innobles.com</a>
                <br />
                Website:{" "}
                <a
                  href="https://innobles.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://innobles.com/
                </a>
              </blockquote>
            </section>
          </article>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;