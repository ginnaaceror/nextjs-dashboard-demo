"use client";

import Image from "next/image";
import { useState } from "react";
import { AUTH_CONFIG } from "@/lib/config";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full bg-gradient px-6 py-4 shadow-md relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/bold_logo_white.svg"
            alt="Bold Logo"
            width={100}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </div>

        <nav className="hidden md:flex items-center gap-7">
          <a
            href={AUTH_CONFIG.LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Mi negocio
          </a>
          <a
            href={AUTH_CONFIG.HELP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            Ayuda
            <span className="material-icons text-base">help_outline</span>
          </a>
        </nav>

        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          <span className="material-icons">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white shadow-lg animate-slide-down z-50">
          <nav className="flex flex-col">
            <a
              href={AUTH_CONFIG.LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bold-blue hover:bg-gray-light transition-colors text-sm font-medium py-4 px-6 border-b border-gray-light flex items-center gap-2 justify-end"
              onClick={closeMobileMenu}
            >
              Mi negocio
            </a>
            <a
              href={AUTH_CONFIG.HELP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bold-blue hover:bg-gray-light transition-colors text-sm font-medium py-4 px-6 flex items-center gap-2 justify-end"
              onClick={closeMobileMenu}
            >
              Ayuda
              <span className="material-icons text-base">help_outline</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
