// StarContext.js
import React, { createContext, useState } from "react";

export const StarContext = createContext();

export const StarProvider = ({ children = null }) => {
  const [isStarChecked, setIsStarChecked] = useState(false);
  const [scrapCount, setScrapCount] = useState(0);
  const [scrappedItems, setScrappedItems] = useState([]); // 스크랩된 아이템 상태 추가

  return (
    <StarContext.Provider
      value={{
        isStarChecked,
        setIsStarChecked,
        scrapCount,
        setScrapCount,
        scrappedItems, // scrappedItems 제공
        setScrappedItems, // scrappedItems 업데이트를 위한 함수 제공
      }}
    >
      {children}
    </StarContext.Provider>
  );
};
