// ScrapContext.js
import React, { createContext, useContext, useState } from "react";

const ScrapContext = createContext();

export const ScrapProvider = ({ children }) => {
  const [scrapStatus, setScrapStatus] = useState({});

  const toggleScrap = (itemId) => {
    setScrapStatus((prevStatus) => ({
      ...prevStatus,
      [itemId]: !prevStatus[itemId],
    }));
  };

  return (
    <ScrapContext.Provider value={{ scrapStatus, toggleScrap }}>{children}</ScrapContext.Provider>
  );
};

export const useScrap = () => useContext(ScrapContext);
