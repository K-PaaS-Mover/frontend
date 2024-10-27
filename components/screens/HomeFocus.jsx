import { View, Text, ScrollView, BackHandler } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";

import Bell from "../../assets/icons/bell.svg";
import HomeFrameDetail from "./HomeFrameDetail";
import Star from "../../assets/icons/star.svg";
import StarCheck from "../../assets/icons/star_filled.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
`;

const ScrapMessage = styled.View`
  position: absolute;
  /* top: 20px; */
  /* left: 50%; */
  bottom: 80px;
  margin-left: -73.5px;
  background-color: #d6edf9ed;
  opacity: 1;
  width: 157px;
  height: 36px;
  border-radius: 27px;
  z-index: 1;
  padding: 10px;
  align-items: center;
`;

const HomeFocus = ({ selectedItem, isStarChecked, setIsStarChecked }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isHomeFocused, setIsHomeFocused] = useState(true);
  const [scrapCount, setScrapCount] = useState(0);
  const [scrapMessageVisible, setScrapMessageVisible] = useState(false);
  const searchInputRef = useRef(null);
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    // 리프레시 처리 로직
    setRefreshing(false);
  };

  useEffect(() => {
    const backAction = () => {
      if (isSearchFocused) {
        setIsSearchFocused(false);
        return true;
      } else if (isHomeFocused) {
        setIsHomeFocused(false);
        router.replace("/home");
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [isSearchFocused, isHomeFocused]);

  useEffect(() => {
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsSearchFocused(false);
      setIsHomeFocused(true);
    });

    return unsubscribe;
  }, [navigation]);

  const handleStarPress = () => {
    const newStarChecked = !isStarChecked;
    console.log("Star checked:", newStarChecked); // 추가한 로그
    setIsStarChecked(newStarChecked); // 상위 컴포넌트의 상태를 업데이트
    if (newStarChecked) {
      setScrapCount(scrapCount + 1);
      setScrapMessageVisible(true); // 스크랩 메시지 표시
      setTimeout(() => setScrapMessageVisible(false), 2000); // 2초 후 메시지 숨기기
    } else {
      setScrapCount(scrapCount - 1);
      setScrapMessageVisible(false); // 스크랩 해제 시 메시지 숨기기
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 items-center">
        <ButtonRow className="w-[355px] mt-[-10px]">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setIsSearchFocused(false);
              setIsHomeFocused(false);
              router.replace("/home");
            }}
          >
            <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
          </TouchableOpacity>
          <Bell width={24} height={24} />
        </ButtonRow>

        <ScrollView style={{ paddingTop: 20 }}>
          <HomeFrameDetail selectedItem={selectedItem} />
        </ScrollView>

        {scrapMessageVisible && ( // 스크랩 메시지 표시
          <ScrapMessage>
            <Text className="font-pregular text-[#515259] text-[12px]">스크랩을 완료했습니다.</Text>
          </ScrapMessage>
        )}

        <ButtonRow className="w-full h-[70px]">
          <TouchableOpacity
            className="w-[82px] h-full justify-center items-center"
            onPress={handleStarPress}
          >
            {isStarChecked ? <StarCheck width={24} height={24} /> : <Star width={24} height={24} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#50c3fa",
              width: 330,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.push("https://naver.com")}
          >
            <Text className="font-psemibold text-[18px] text-white">바로가기</Text>
          </TouchableOpacity>
        </ButtonRow>
      </View>
    </SafeAreaView>
  );
};

export default HomeFocus;
