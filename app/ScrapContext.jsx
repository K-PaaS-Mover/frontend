import { createContext, useContext, useState } from "react";

// 스크랩 컨텍스트 생성
const ScrapContext = createContext();

// 스크랩 컨텍스트 프로바이더
export const ScrapProvider = ({ children }) => {
  const [scrappedItems, setScrappedItems] = useState([]); // 초기값 설정

  const addScrap = (item) => {
    setScrappedItems((prevItems) => [...prevItems, item]);
  };

  const removeScrap = (id) => {
    setScrappedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ScrapContext.Provider value={{ scrappedItems, addScrap, removeScrap, setScrappedItems }}>
      {children}
    </ScrapContext.Provider>
  );
};

// 스크랩 훅
export const useScrap = () => {
  return useContext(ScrapContext);
};
