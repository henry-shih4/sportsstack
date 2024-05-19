import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { user, isAuthenticated } = useAuth0();


  return (
    <>
      <main className="flex flex-col justify-around">
        <header className="flex justify-between">
          {isAuthenticated ? (
            <div>
              <img
                className="rounded-full mb-"
                height={58}
                width={58}
                src={user.picture}
                alt={user?.name}
              />
              <div>{user.name}</div>
            </div>
          ) : null}
          <LoginButton />
          <LogoutButton />
        </header>
        <h1 className="text-3xl font-bold tracking-wider">SportsStack</h1>
        <p>Latest Sport Headlines</p>
      </main>
    </>
  );
}
