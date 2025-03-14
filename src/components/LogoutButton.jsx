import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={() => logout()}
      className="bg-slate-700 text-gray-100 px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-800 border border-slate-600"
    >
      Log Out
    </button>
  );
}
