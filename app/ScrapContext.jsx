// ScrapContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { addScrap as apiAddScrap, removeScrap as apiRemoveScrap } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScrapContext = createContext();

export const useScrap = () => {
  return useContext(ScrapContext);
};

export const ScrapProvider = ({ children }) => {
  const [scrappedItems, setScrappedItems] = useState([]);

  useEffect(() => {
    // 초기 스크랩 데이터를 AsyncStorage에서 불러오기
    const loadScrappedItems = async () => {
      try {
        const storedScraps = await AsyncStorage.getItem("scrappedItems");
        if (storedScraps) {
          setScrappedItems(JSON.parse(storedScraps));
        }
      } catch (error) {
        console.error("스크랩 데이터 로드 실패:", error);
      }
    };

    loadScrappedItems();
  }, []);

  useEffect(() => {
    // 스크랩 데이터가 변경될 때마다 AsyncStorage에 저장
    AsyncStorage.setItem("scrappedItems", JSON.stringify(scrappedItems));
  }, [scrappedItems]);

  const addScrap = async (policyId) => {
    const response = await apiAddScrap(policyId);
    if (response.success) {
      setScrappedItems((prev) => [...prev, { id: policyId }]);
    } else {
      alert(response.message);
    }
  };

  const removeScrap = async (policyId) => {
    const response = await apiRemoveScrap(policyId);
    if (response.success) {
      setScrappedItems((prev) => prev.filter((item) => item.id !== policyId));
    } else {
      alert(response.message);
    }
  };

  return (
    <ScrapContext.Provider value={{ scrappedItems, addScrap, removeScrap }}>
      {children}
    </ScrapContext.Provider>
  );
};
