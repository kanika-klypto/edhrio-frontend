import { Brand } from "./Brand";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-twitter h-4 w-4"
        aria-hidden="true"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-youtube h-4 w-4"
        aria-hidden="true"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
        <path d="m10 15 5-3-5-3z"></path>
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-circle h-4 w-4"
        aria-hidden="true"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
      </svg>
    ),
  },
];

const footerColumns = [
  {
    title: "Products",
    links: ["Terminal", "Screener", "Alerts", "Mobile app"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press kit", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "API reference", "Status", "Changelog"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Risk disclosure", "Cookies"],
  },
];

export function Footer({ theme }) {
  return (
    <footer
      className="relative overflow-hidden bg-(--bg-secondary) text-inksoft"
      data-testid="footer-section"
    >
      <div className="grain"></div>
      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand footer theme={theme} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              The charting terminal for 2.4M+ traders. See the market clearly.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ name, href, icon }) => (
                <Link
                  key={name}
                  to={href}
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-inksoft no-underline transition-colors hover:border-accent hover:text-accent"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="font-mono text-xs font-bold! uppercase tracking-wider text-inksoft">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm !text-inksoft !no-underline transition-colors hover:!text-accent hover:!no-underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative mt-8 flex flex-col items-center justify-between gap-3 border-t border-border py-7 text-xs text-inksoft sm:flex-row">
          <p>© 2026 Edhrio. All rights reserved.</p>
          <p>Made for traders, by traders.</p>
        </div>
      </div>
    </footer>
  );
}
