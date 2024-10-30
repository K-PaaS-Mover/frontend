// UserContext.js
// import React, { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children = null }) => {
//   const [userId, setUserId] = useState("");

//   return <UserContext.Provider value={{ userId, setUserId }}>{children}</UserContext.Provider>;
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children = null }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserContext.Provider
      value={{ userId, setUserId, username, setUsername, password, setPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
