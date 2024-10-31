// SearchContext.js
import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
