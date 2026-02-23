"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Search, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/dashboard", label: "My Companions" },
  { href: "/teams", label: "Teams" },
  { href: "/creator", label: "Create" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">Companion</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 transition-colors">
              <Search className="h-4 w-4" />
              <span>Search agents...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-gray-200 bg-white px-1.5 text-xs text-gray-400">
                ⌘K
              </kbd>
            </button>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">
                <Sparkles className="h-4 w-4" />
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2 px-1">
                <Link href="/auth/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Sign in</Button>
                </Link>
                <Link href="/auth/register" className="flex-1">
                  <Button size="sm" className="w-full">Get started</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
