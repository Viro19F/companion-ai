import Link from "next/link";
import { Bot } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "My Companions", href: "/dashboard" },
    { label: "Agent Teams", href: "/teams" },
    { label: "Pricing", href: "/#pricing" },
  ],
  Creators: [
    { label: "Build an Agent", href: "/creator" },
    { label: "Creator Dashboard", href: "/creator" },
    { label: "Documentation", href: "/docs" },
    { label: "Payouts", href: "/creator/payouts" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Companion</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI agents that actually work for you. Discover, subscribe, and
              automate your life.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-8">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Companion AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600 text-sm">
              Twitter
            </a>
            <a href="https://github.com" className="text-gray-400 hover:text-gray-600 text-sm">
              GitHub
            </a>
            <a href="https://discord.gg" className="text-gray-400 hover:text-gray-600 text-sm">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
