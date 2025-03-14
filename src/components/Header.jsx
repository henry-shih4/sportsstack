import React from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  // Simplified active check function
  const isActivePath = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand Section */}
          <NavLink 
            to="/all/1" 
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          >
            {/* Logo SVG */}
            <svg 
              className="w-10 h-10 text-blue-400"
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2"/>
              <path 
                d="M12 20C12 13.373 17.373 8 24 8C30.627 8 36 13.373 36 20" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M28 20C28 26.627 22.627 32 16 32C9.373 32 4 26.627 4 20" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-wider">
                Sports<span className="text-blue-400">Stack</span>
              </h1>
              <p className="text-xs text-gray-300">Latest Sport Headlines</p>
            </div>
          </NavLink>

          {/* Navigation and Auth Section */}
          <div className="flex items-center space-x-6">
            {/* User Profile Button */}
            {isAuthenticated ? (
              <button 
                onClick={() => navigate('/user')} 
                className="flex items-center space-x-3 bg-slate-700 rounded-full px-4 py-2 hover:bg-slate-600 transition-colors border border-slate-600"
              >
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-blue-400"
                  src={user.picture}
                  alt={user?.name}
                />
                <span className="hidden md:block text-sm font-medium text-gray-100">
                  {user.name}
                </span>
              </button>
            ) : (
              <div className="w-8" /> // Spacer
            )}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <LoginButton />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-12">
          <NavLink 
              to="/all/1" 
              className={({ isActive }) => `
                inline-flex items-center px-3 pt-1 text-sm font-medium
                transition-all duration-200 border-b-2
                ${isActive || isActivePath('/all')
                  ? 'text-blue-400 border-blue-400 font-semibold' 
                  : 'text-gray-100 border-transparent hover:text-blue-400 hover:border-blue-400'}
              `}
            >
              All Sports
            </NavLink>
            <NavLink 
              to="/NBA/1" 
              className={({ isActive }) => `
                inline-flex items-center px-3 pt-1 text-sm font-medium
                transition-all duration-200 border-b-2
                ${isActive || isActivePath('/NBA')
                  ? 'text-blue-400 border-blue-400 font-semibold' 
                  : 'text-gray-100 border-transparent hover:text-blue-400 hover:border-blue-400'}
              `}
            >
              NBA
            </NavLink>

            <NavLink 
              to="/NFL/1" 
              className={({ isActive }) => `
                inline-flex items-center px-3 pt-1 text-sm font-medium
                transition-all duration-200 border-b-2
                ${isActive || isActivePath('/NFL')
                  ? 'text-blue-400 border-blue-400 font-semibold' 
                  : 'text-gray-100 border-transparent hover:text-blue-400 hover:border-blue-400'}
              `}
            >
              NFL
            </NavLink>

            <NavLink 
              to="/MLB/1" 
              className={({ isActive }) => `
                inline-flex items-center px-3 pt-1 text-sm font-medium
                transition-all duration-200 border-b-2
                ${isActive || isActivePath('/MLB')
                  ? 'text-blue-400 border-blue-400 font-semibold' 
                  : 'text-gray-100 border-transparent hover:text-blue-400 hover:border-blue-400'}
              `}
            >
              MLB
            </NavLink>

          </div>
        </div>
      </nav>
    </header>
  );
}
