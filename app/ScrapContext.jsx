// src/contexts/ScrapContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { addScrap, removeScrap } from "./(api)/Policy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

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

  const addScrapItem = async (policyId) => {
    try {
      const response = await addScrap(policyId);
      if (response.success) {
        setScrappedItems((prev) => [...prev, { id: policyId }]);
      } else {
        Alert.alert("오류", response.message);
      }
    } catch (error) {
      Alert.alert("오류", error.message || "스크랩 추가 중 오류가 발생했습니다.");
    }
  };

  const removeScrapItem = async (policyId) => {
    try {
      const response = await removeScrap(policyId);
      if (response.success) {
        setScrappedItems((prev) => prev.filter((item) => item.id !== policyId));
      } else {
        Alert.alert("오류", response.message);
      }
    } catch (error) {
      Alert.alert("오류", error.message || "스크랩 제거 중 오류가 발생했습니다.");
    }
  };

  return (
    <ScrapContext.Provider value={{ scrappedItems, addScrapItem, removeScrapItem }}>
      {children}
    </ScrapContext.Provider>
  );
};
