import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const App = () => {
  const [input, setInput] = useState("");
  const { user, login, logout } = useAuth();

  return (
    <div>
      <h1>User Authentication</h1>

      {user ? (
        <div>
          <p>Welcome {user.username}</p>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => login({ username: input })}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
