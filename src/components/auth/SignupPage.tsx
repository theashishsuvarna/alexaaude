import React, { useState } from 'react';
import { AlexaAudeMark } from '../AlexaAudeMark';
import { ArrowRight, Lock, Mail, User, ShieldCheck, Home } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (route: string) => void;
  onSignupSuccess: (data?: { name: string; familyName: string; email: string }) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess({
        name: name || 'Household Head',
        familyName: familyName || 'Our Family',
        email: email || 'family@alexaaude.os',
      });
    }, 400);
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
          Create your family
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600">
          Set up a private, unified operating system for your household.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-slate-200/90">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label htmlFor="signup-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Your full name
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-slate-50/50 hover:bg-white transition-colors"
                  placeholder="e.g. Virat Kohli"
                />
              </div>
            </div>

            {/* Household / Family Name */}
            <div>
              <label htmlFor="signup-family" className="block text-xs font-semibold text-slate-700 mb-1">
                Family or household name
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Home className="h-4 w-4" />
                </div>
                <input
                  id="signup-family"
                  type="text"
                  required
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-slate-50/50 hover:bg-white transition-colors"
                  placeholder="e.g. Kohli Family"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-slate-50/50 hover:bg-white transition-colors"
                  placeholder="name@family.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-slate-50/50 hover:bg-white transition-colors"
                  placeholder="At least 8 characters"
                />
              </div>
            </div>

            {/* Privacy promise */}
            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Private household encryption. Zero advertising data profiling.</span>
            </div>

            {/* Submit Create Account */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Setting up family space...</span>
                ) : (
                  <>
                    <span>Create account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Already have an account? Log in */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('/login')}
                className="font-bold text-slate-900 hover:underline cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
