import { View, Text, ScrollView, BackHandler, ActivityIndicator, Linking } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";
import { addScrap, removeScrap, getPolicyById } from "../app/(api)/Policy";
import { StarContext } from "./StarContext";
import HomeFrameDetail from "../components/policyFrame/homeScreens/HomeFrameDetail";
import Bell from "../assets/icons/bell.svg";
import Star from "../assets/icons/star.svg";
import StarCheck from "../assets/icons/star_filled.svg";

import { getScraps } from "./(api)/Calendor";

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
  const { policyId = "", selectedItem = {} } = route.params || {};
  const { scrappedItems = [], setScrappedItems } = useContext(StarContext);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [scrapMessageVisible, setScrapMessageVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;

    const fetchPolicy = async () => {
      setLoading(true);
      try {
        const result = await getPolicyById(policyId);
        if (result.success) {
          if (isMounted) {
            setSelectedPolicy(result.data);
          }
        } else {
          if (isMounted) {
            setError(result.message);
            Alert.alert("오류", result.message);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("정책 데이터를 가져오는 중 오류가 발생했습니다.");
          Alert.alert("오류", "정책 데이터를 가져오는 중 오류가 발생했습니다.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPolicy();

    return () => {
      isMounted = false; // 언마운트 시 플래그 설정
    };
  }, [policyId]); // selectedItem을 의존성 배열에서 제거

  const fetchScrapList = async () => {
    try {
      const response = await getScraps();
      console.log("스크랩 목록:", response); // API의 전체 응답을 확인합니다.

      if (response.success) {
        // 스크랩 목록이 비어있지 않으면, 해당 아이템이 존재하는지 확인
        const isScrapped = response.data.some((item) => item.id === selectedItem.id);
        console.log("스크랩 여부:", isScrapped);
      } else {
        console.error("스크랩 목록 조회 실패:", response.message);
      }
    } catch (error) {
      console.error("스크랩 목록을 가져오는 중 오류:", error);
    }
  };

  const handleScrap = async () => {
    const newScrapped = !scrappedItems.some((item) => item.id === selectedItem.id);
    await fetchScrapList(); // 스크랩 목록 확인

    if (newScrapped) {
      // 스크랩 추가
      setScrappedItems((prevItems) => [...prevItems, selectedItem]); // 기존 스크랩 아이템에 추가
      setScrapMessageVisible(true);
      if (selectedPolicy) {
        setSelectedPolicy((prevPolicy) => ({
          ...prevPolicy,
          scrapCount: prevPolicy.scrapCount + 1,
        }));
      }
      try {
        await addScrap(selectedItem.id);
        Alert.alert("성공", "스크랩이 추가되었습니다.");
      } catch (error) {
        Alert.alert("오류", "스크랩 추가에 실패하셨습니다.");
      }
    } else {
      // 스크랩 제거
      setScrappedItems((prevItems) => prevItems.filter((item) => item.id !== selectedItem.id));
      if (selectedPolicy) {
        setSelectedPolicy((prevPolicy) => ({
          ...prevPolicy,
          scrapCount: prevPolicy.scrapCount - 1,
        }));
      }
      try {
        await removeScrap(selectedItem.id);
        Alert.alert("성공", "스크랩이 제거되었습니다.");
      } catch (error) {
        Alert.alert("오류", "스크랩 제거에 실패하셨습니다.");
      }
    }
    setTimeout(() => setScrapMessageVisible(false), 2000);
    await fetchScrapList(); // 스크랩 목록 확인 (추가)
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("home");
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const handleOpenLink = async () => {
    const url = "https://naver.com";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("오류", "해당 URL을 열 수 없습니다.");
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

  if (!selectedPolicy) {
    return null;
  }

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
          <HomeFrameDetail selectedItem={selectedPolicy} />
        </ScrollView>

        {scrapMessageVisible && (
          <ScrapMessage>
            <Text className="font-pregular text-[#515259] text-[12px]">스크랩을 완료했습니다.</Text>
          </ScrapMessage>
        )}

        <ButtonRow className="w-full h-[70px]">
          <TouchableOpacity
            className="w-[82px] h-full justify-center items-center"
            onPress={handleScrap}
          >
            {scrappedItems.some((item) => item.id === selectedItem.id) ? (
              <StarCheck width={24} height={24} />
            ) : (
              <Star width={24} height={24} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#50c3fa",
              width: 330,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleOpenLink}
          >
            <Text className="font-psemibold text-[18px] text-white">바로가기</Text>
          </TouchableOpacity>
        </ButtonRow>
      </View>
    </SafeAreaView>
  );
};

export default HomeFocus;
