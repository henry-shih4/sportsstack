import React, { useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      <main className="flex flex-col justify-around pb-6">
        <header className="flex flex-col md:flex-row md:justify-between justify-center items-center">
          {isAuthenticated ? (
            <button onClick={() => navigate('/user')} className="flex flex-col justify-center items-center">
              <img
                className="rounded-full mb-"
                height={58}
                width={58}
                src={user.picture}
                alt={user?.name}
              />
              <div>{user.name}</div>
            </button>
          ) : (
            <div className="w-[58px]"></div>
          )}
          <Link className="py-4" to="/all/1">
            <h1 className="text-3xl font-bold tracking-wider">SportsStack</h1>
            <p>Latest Sport Headlines</p>{" "}
          </Link>
          <LoginButton />
          <LogoutButton />
        </header>
      </main>
    </>
  );
}
