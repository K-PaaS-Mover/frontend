// Home.js
import {
  View,
  Text,
  FlatList,
  ScrollView,
  BackHandler,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";

import Bell from "../../assets/icons/bell.svg";
import Main from "../../assets/images/main.svg";

import SearchInput from "../../components/search/SearchInput";
import SearchFocus from "../../components/search/SearchFocus";
import CustomButton from "../../components/signComponents/CustomButton";
import HomeFrame from "../../components/policyFrame/HomeFrame";
import { useScrap } from "../ScrapContext";
import { getRecommendedPolicies } from "../(api)/Policy";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchInputRef = useRef(null);
  const navigation = useNavigation();
  const { scrappedItems, addScrap, removeScrap } = useScrap();
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecommendedPolicies(); // 새로 고침 시 추천 정책을 다시 가져옵니다.
    setRefreshing(false);
  };

  // 추천 정책을 API로부터 가져오는 함수
  const fetchRecommendedPolicies = async () => {
    setLoading(true); // 데이터를 가져오기 전에 로딩 상태 설정
    try {
      const response = await getRecommendedPolicies();
      if (response.success) {
        setRecommendedPolicies(response.data);
        setError(null);
        response.data.forEach((policy) => {
          console.log(`Policy ID: ${policy.id}, Scrap Count: ${policy.scrapCount}`);
        });
      } else {
        setError(response.message);
        Alert.alert("오류", response.message);
      }
    } catch (err) {
      setError(err.message || "추천 정책을 가져오는 데 실패했습니다.");
      Alert.alert("오류", err.message || "추천 정책을 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  const toggleScrap = async (policyId) => {
    if (scrappedItems.some((scrap) => scrap.id === policyId)) {
      // 스크랩된 경우 제거
      try {
        await removeScrap(policyId);
        // 상태에서 직접 제거
        setScrappedItems((prev) => prev.filter((scrap) => scrap.id !== policyId));
      } catch (error) {
        console.error("스크랩 제거 오류", error);
        Alert.alert("오류", error.message || "스크랩 제거에 실패하였습니다.");
      }
    } else {
      try {
        await addScrap(policyId);
        // 상태에 추가
        setScrappedItems((prev) => [...prev, { id: policyId }]);
      } catch (error) {
        console.error("스크랩 추가 오류", error);
        Alert.alert("오류", error.message || "스크랩 추가에 실패하였습니다.");
      }
    }
    setSelectedItem((prev) =>
      prev && prev.id === policyId ? { ...prev, isScrapped: !prev.isScrapped } : prev
    );
  };

  useEffect(() => {
    fetchRecommendedPolicies();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("종료", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
          style: "cancel",
        },
        { text: "확인", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // true를 반환하여 기본 동작 방지
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []); // 빈 배열을 의존성으로 사용하여 한 번만 등록

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsSearchFocused(false);
      setSelectedItem(null);
    });

    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <Text>Error: {error}</Text>
        <TouchableOpacity
          onPress={fetchRecommendedPolicies} // 에러 시 재시도
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: "blue" }}>다시 시도하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // const cleanCategory = (category) => {
  //   if (!category) return ""; // category가 없을 경우 빈 문자열 반환

  //   // category가 배열일 경우 각 항목을 공백으로 연결하여 문자열로 변환
  //   if (Array.isArray(category)) {
  //     return category.join(" ");
  //   }

  //   // category가 문자열일 경우 기존 로직을 그대로 적용
  //   return category
  //     .replace(/[\[\]\"']/g, "") // 대괄호와 따옴표 제거
  //     .split(",") // 쉼표로 분리하여 배열로 변환
  //     .map((item) => item.trim()) // 각 항목의 공백 제거
  //     .join(" "); // 공백으로 연결하여 문자열로 변환
  // };

  return (
    <SafeAreaView className="bg-white h-full">
      {isSearchFocused ? (
        <SearchFocus />
      ) : (
        <FlatList
          data={recommendedPolicies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(item);
                navigation.navigate("HomeFocus", {
                  selectedItem: item,
                  policyId: item.id, // policyId 추가
                  isStarChecked: scrappedItems.some((scrap) => scrap.id === item.id),
                });
              }}
            >
              <HomeFrame
                title={item.title}
                company={item.department}
                startDate={item.startDate}
                endDate={item.endDate}
                categories={item.categories}
                views={item.views}
                scrapCount={item.scrapCount}
                isScrapped={scrappedItems.some((scrap) => scrap.id === item.id)}
                toggleScrap={() => toggleScrap(item.id)}
              />
            </TouchableOpacity>
          )}
          ListHeaderComponent={() => (
            <View className="h-[350px] my-[-25px] px-4">
              <View className="flex-1 justify-center items-center">
                <ButtonRow>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setIsSearchFocused(false);
                      // router.replace("/home");
                    }}
                  >
                    <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
                  </TouchableOpacity>
                  <Bell width={24} height={24} />
                </ButtonRow>
                <SearchInput
                  ref={searchInputRef}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <ButtonRow className="w-[100%] mt-[30px]">
                  <Text className="text-black text-[14px] font-pbold mr-[20px]">인기</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[
                      "인기 검색어1",
                      "인기 검색어2",
                      "인기 검색어3",
                      "인기 검색어4",
                      "인기 검색어5",
                      "인기 검색어6",
                      "인기 검색어7",
                      "인기 검색어8",
                      "인기 검색어9",
                      "인기 검색어10",
                    ].map((title) => (
                      <CustomButton
                        key={title}
                        title={title}
                        handlePress={() => {
                          setIsSearchFocused(false);
                          // router.push("/");
                        }}
                        containerStyles="w-[90px] h-[25px] border-[#DFE3E7] border-[1px] rounded-[8px] mr-[10px]"
                        textStyles="text-center text-[#515259] text-[12px] font-pregular"
                      />
                    ))}
                  </ScrollView>
                </ButtonRow>
                <View className="mt-[30px] mb-[20px]">
                  <Main />
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponentStyle={{ paddingBottom: 20 }}
          ListFooterComponent={() => (
            <View className="w-full px-4 mt-5">
              <Text className="font-pbold text-[20px]">추천 정책</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
