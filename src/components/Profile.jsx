import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (user){
    console.log(user)
  }
  async function getAccessToken() {
    try {
      const response = await getAccessTokenSilently();
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return isAuthenticated ? (
    <div className="flex flex-col justify-center items-center pt-40 gap-y-3">
      {user?.picture && (
        <img height={180} width={180} src={user.picture} alt={user?.name} />
      )}
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <button onClick={getAccessToken}>get token</button>
    </div>
  ) : (
    <p>Login</p>
  );
}

export default Profile;
