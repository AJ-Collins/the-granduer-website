import { CmsLogoutButton } from "../auth/cms-logout-button";
export { CmsShell } from "./cms-shell";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/content", label: "Content" },
  { href: "/packages", label: "Packages" },
  { href: "/events", label: "Events" },
  { href: "/faqs", label: "FAQs" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/gallery", label: "Gallery" },
];

export function CmsNav() {
  return (
    <header>
      <nav>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}{" "}
        <CmsLogoutButton />
      </nav>
    </header>
  );
}
