import React, { useState } from "react";
import { Sparkles, Menu, X, ArrowRight, Cpu, HelpCircle, Layers, Info, CheckCircle2 } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onStartClassification: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onStartClassification,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "classify", label: "Classify", icon: Cpu },
    { id: "how-it-works", label: "How It Works", icon: HelpCircle },
    { id: "model", label: "Model", icon: Layers },
    { id: "about", label: "About", icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    // Smooth scroll to element if present
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          id="nav-logo"
          onClick={() => handleNavClick("home")}
          className="group flex cursor-pointer items-center gap-3 transition-transform hover:scale-102"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950/90 text-xl font-bold">
              🐾
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white">
                Animal<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
              </span>
              <span className="hidden items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DL Model Online
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Deep Learning Vision Classifier
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`group flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-cyan-400 shadow-sm ring-1 ring-slate-700"
                    : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            id="start-classification-btn"
            onClick={onStartClassification}
            className="relative group inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-cyan-500/30 hover:scale-102 active:scale-98"
          >
            <span>Start Classification</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-6 backdrop-blur-xl md:hidden">
          <div className="space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-base font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-cyan-400"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 text-slate-400" />
                  {link.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              id="mobile-start-classification-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onStartClassification();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-500/20"
            >
              <span>Start Classification</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
