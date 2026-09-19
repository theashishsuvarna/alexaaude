import React, { useState } from 'react';
import { AlexaAudeMark } from '../AlexaAudeMark';
import { ArrowRight, Lock, Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (route: string) => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('virat.kohli@household.os');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotToast, setShowForgotToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 450);
  };

  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      {/* Top back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-200/60 cursor-pointer"
        >
          <span>← Back to AlexaAude Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* Brand Mark */}
        <div
          onClick={() => onNavigate('/')}
          className="inline-flex flex-col items-center cursor-pointer group mb-4"
        >
          <AlexaAudeMark size="xl" />
          <span className="text-xl font-bold tracking-tight text-slate-900 mt-3">AlexaAude</span>
          <span className="text-xs text-slate-500 font-medium">Family Operating System</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Welcome back.
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Log in to access your family intelligence, connected home, and schedules.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-slate-200/90">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-slate-50/50 hover:bg-white transition-colors"
                  placeholder="name@family.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotToast(true)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-slate-50/50 hover:bg-white transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Remember me & Trust */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-slate-300 rounded"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me</span>
              </label>

              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span>Isolated sandbox</span>
              </span>
            </div>

            {/* Forgot password simulated toast */}
            {showForgotToast && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-start justify-between">
                <span>Password reset token sent to your registered email (demo mode).</span>
                <button
                  type="button"
                  onClick={() => setShowForgotToast(false)}
                  className="font-bold text-blue-900 ml-2"
                >
                  ×
                </button>
              </div>
            )}

            {/* Submit Log in */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Log in</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Bypass */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mb-2.5">
              Instant Preview Access
            </p>
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Enter with Kohli Family Demo Account</span>
            </button>
          </div>

          {/* Don't have an account? */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              Don&apos;t have an account?{' '}
              <button
                onClick={() => onNavigate('/signup')}
                className="font-bold text-slate-900 hover:underline cursor-pointer"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
