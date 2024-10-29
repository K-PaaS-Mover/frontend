import { View, Text, ScrollView, BackHandler } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";

// 추가
import { addScrap, removeScrap, recordNavigateAPI } from "../app/(api)/Policy";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
//

import { StarContext } from "./StarContext";

import HomeFrameDetail from "../components/policyFrame/homeScreens/HomeFrameDetail";
import Bell from "../assets/icons/bell.svg";
import Star from "../assets/icons/star.svg";
import StarCheck from "../assets/icons/star_filled.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const ScrapMessage = styled.View`
  position: absolute;
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

const HomeFocus = () => {
  const route = useRoute();
  const { policyId } = route.params;
  const { selectedItem } = route.params || {};
  const { scrappedItems, setScrappedItems } = useContext(StarContext);
  const [scrapMessageVisible, setScrapMessageVisible] = useState(false);
  const isStarChecked = scrappedItems.some((item) => item.id === selectedItem.id); // 현재 선택된 항목의 스크랩 상태
  //   추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // 에러 상태를 선언
  //
  // 추가
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const result = await getPolicyById(policyId);
        if (result.success) {
          setSelectedItem(result.data);
          setScrapCount(result.data.scrapCount);
          // 스크랩 여부 확인 (예: 스크랩 목록에 있는지 확인)
          // 여기서는 간단히 예시로 스크랩되지 않은 상태로 초기화
          setIsScrapped(false);
        } else {
          setError(result.message);
          Alert.alert("오류", result.message);
        }
      } catch (err) {
        setError("정책 데이터를 가져오는 중 오류가 발생했습니다.");
        Alert.alert("오류", "정책 데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [policyId]);

  //

  useEffect(() => {
    const backAction = () => {
      router.replace("/home");
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);

  const handleScrap = async () => {
    const newScrapped = !isScrapped;
    setIsScrapped(newScrapped); // 상위 컴포넌트의 상태를 업데이트
    if (newScrapped) {
      setScrapCount(scrapCount + 1);
      setScrapMessageVisible(true); // 스크랩 메시지 표시
      try {
        await addScrap(selectedItem.id);
        Alert.alert("성공", "스크랩이 추가되었습니다.");
      } catch (error) {
        console.log("스크랩 추가 오류", error);
        Alert.alert("오류", error.message || "스크랩 추가에 실패하셨습니다.");
        setIsScrapped(false);
        setScrapCount(scrapCount - 1);
      }
      setTimeout(() => setScrapMessageVisible(false), 2000); // 2초 후 메시지 숨기기
    } else {
      setScrapCount(scrapCount - 1);
      setScrapMessageVisible(false); // 스크랩 해제 시 메시지 숨기기
      try {
        await removeScrap(selectedItem.id);
        Alert.alert("성공", "스크랩이 제거되었습니다.");
      } catch (error) {
        console.error("스크랩 제거 오류", error);
        Alert.alert("오류", error.message || "스크랩 제거에 실패하였습니다.");
        setIsScrapped(true);
        setScrapCount(scrapCount + 1);
      }
    }
  };

  const handleOpenLink = async () => {
    try {
      setLoading(true);
      if (response.success) {
        // 외부 링크 열기
        const url = "https://naver.com";
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          Alert.alert("오류", "해당 URL을 열 수 없습니다.");
        }
      } else {
        Alert.alert("오류", "백엔드 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("링크 열기 오류:", error);
      Alert.alert("오류", "링크를 여는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{error}</Text>
      </View>
    );
  }

  if (!selectedItem) {
    return null;
  }

  const handleStarPress = () => {
    if (!isStarChecked) {
      // 스크랩 추가
      setScrappedItems([...scrappedItems, selectedItem]);
      setScrapMessageVisible(true);
      setTimeout(() => setScrapMessageVisible(false), 2000);
    } else {
      // 스크랩 제거
      setScrappedItems(scrappedItems.filter((item) => item.id !== selectedItem.id));
      setScrapMessageVisible(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 items-center mt-[30px]">
        <ButtonRow className="w-[355px] mt-[-10px]">
          <TouchableOpacity activeOpacity={1} onPress={() => router.replace("/home")}>
            <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
          </TouchableOpacity>
          <Bell width={24} height={24} />
        </ButtonRow>

        <ScrollView style={{ paddingTop: 20 }}>
          <HomeFrameDetail selectedItem={selectedItem} />
        </ScrollView>

        {scrapMessageVisible && (
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
