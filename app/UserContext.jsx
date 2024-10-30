// UserContext

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children = null }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState(""); // 추가
  const [birthDate, setBirthDate] = useState(""); // 추가
  const [job, setJob] = useState(""); // 추가
  const [workExperience, setWorkExperience] = useState(""); // 추가
  const [residence, setResidence] = useState(""); // 추가

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        username,
        setUsername,
        password,
        setPassword,
        nickname,
        setNickname,
        birthDate,
        setBirthDate,
        job,
        setJob, // 추가
        workExperience,
        setWorkExperience, // 추가
        residence,
        setResidence, // 추가
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
