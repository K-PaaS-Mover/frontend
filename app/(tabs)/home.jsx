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
import { getPolicies, getRecommendedPolicies, checkScrapStatus } from "../(api)/Policy";

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
  const [isHomeFocused, setIsHomeFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const searchInputRef = useRef(null);
  const navigation = useNavigation();
  const { scrappedItems, addScrap, removeScrap } = useScrap();
  const [policies, setPolicies] = useState([]);
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const fetchAllPolicies = async () => {
    try {
      const response = await getPolicies();
      console.log("fetchAllPolicies 응답:", response); // 추가
      if (response.success) {
        setPolicies(response.data);
        setError(null);
      } else {
        setError(response.message);
        Alert.alert("오류", response.message);
      }
    } catch (err) {
      console.error("API 요청 중 오류 발생:", err); // 추가
      setError(err.message || "정책 데이터를 가져오는 데 실패했습니다.");
      Alert.alert("오류", err.message || "정책 데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 추천 정책을 API로부터 가져오는 함수
  const fetchRecommendedPolicies = async () => {
    try {
      const response = await getRecommendedPolicies();
      if (response.success) {
        setRecommendedPolicies(response.data);
        setError(null);
      } else {
        setError(response.message);
        Alert.alert("오류", response.message);
      }
    } catch (err) {
      setError(err.message || "추천 정책을 가져오는 데 실패했습니다.");
      Alert.alert("오류", err.message || "추천 정책을 가져오는 데 실패했습니다.");
    }
  };

  const toggleScrap = async (policyId) => {
    if (scrappedItems.some((scrap) => scrap.id === policyId)) {
      // 스크랩된 경우 제거
      try {
        await removeScrap(policyId);
      } catch (error) {
        console.error("스크랩 제거 오류", error);
        Alert.alert("오류", error.message || "스크랩 제거에 실패하였습니다.");
      }
    } else {
      try {
        addScrap(policyId);
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
    fetchAllPolicies();
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
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsSearchFocused(false);
      setIsHomeFocused(false);
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
          onPress={() => {
            fetchAllPolicies();
            fetchRecommendedPolicies();
          }}
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: "blue" }}>다시 시도하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

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
                  isStarChecked: scrappedItems.some((scrap) => scrap.id === item.id),
                });
              }}
            >
              <HomeFrame
                title={item.title}
                company={item.department}
                period={item.period}
                category={item.category}
                views={item.views}
                scrap={item.scrap}
                isScrapped={scrappedItems.some((scrap) => scrap.id === item.id)}
                toggleScrap={() => toggleScrap(item)}
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
