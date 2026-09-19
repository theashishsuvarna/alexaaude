import React, { useState } from 'react';
import { AlexaAudeMark } from '../AlexaAudeMark';
import { Menu, X, ArrowRight, Sparkles, LayoutDashboard } from 'lucide-react';

interface LandingNavbarProps {
  onNavigate: (route: string) => void;
  onExploreDemo: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onNavigate, onExploreDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <AlexaAudeMark size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 tracking-tight">AlexaAude</span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300">
                Family AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Your family&apos;s AI. Your life&apos;s operating system.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            onClick={() => scrollToSection('problem')}
            className="hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            The Problem
          </button>
          <button
            onClick={() => scrollToSection('how-it-thinks')}
            className="hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            How It Thinks
          </button>
          <button
            onClick={() => scrollToSection('capabilities')}
            className="hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollToSection('example')}
            className="hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            Real Scenario
          </button>
          <button
            onClick={() => scrollToSection('smart-home')}
            className="hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            Smart Home
          </button>
          <button
            onClick={() => scrollToSection('proactive')}
            className="hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            Proactive AI
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onExploreDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-blue-600" />
            <span>Explore Demo</span>
          </button>

          <button
            onClick={() => onNavigate('/login')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Log In
          </button>

          <button
            onClick={() => onNavigate('/signup')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs cursor-pointer active:scale-98"
          >
            <span>Get Started</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onExploreDemo}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => scrollToSection('problem')}
              className="text-left py-1.5 hover:text-slate-900"
            >
              The Problem
            </button>
            <button
              onClick={() => scrollToSection('how-it-thinks')}
              className="text-left py-1.5 hover:text-slate-900"
            >
              How It Thinks
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="text-left py-1.5 hover:text-slate-900"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('example')}
              className="text-left py-1.5 hover:text-slate-900"
            >
              Real Scenario
            </button>
            <button
              onClick={() => scrollToSection('smart-home')}
              className="text-left py-1.5 hover:text-slate-900"
            >
              Smart Home
            </button>
            <button
              onClick={() => scrollToSection('proactive')}
              className="text-left py-1.5 hover:text-slate-900"
            >
              Proactive AI
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/login');
              }}
              className="w-full py-2.5 text-xs font-semibold text-center rounded-xl border border-slate-200 text-slate-700"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/signup');
              }}
              className="w-full py-2.5 text-xs font-semibold text-center rounded-xl bg-slate-900 text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
