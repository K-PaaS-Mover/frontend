// Home.jsx
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
import HomeFocus from "../../components/policyFrame/homeScreens/HomeFocus";
import { useScrap } from "../../contexts/ScrapContext"; // 컨텍스트 경로에 맞게 수정
import { getPolicies } from "../../api"; // API 함수 경로에 맞게 수정

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
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchInputRef = useRef(null);
  const navigation = useNavigation();
  const { scrappedItems, addScrap, removeScrap } = useScrap(); // useScrap에서 스크랩 관련 함수 가져오기

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPolicies();
    setRefreshing(false);
  };

  // 정책 데이터를 API로부터 가져오는 함수
  const fetchAllPolicies = async () => {
    try {
      const response = await getPolicies();
      if (response.success) {
        setPolicies(response.data);
        setError(null);
      } else {
        setError(response.message);
        Alert.alert("오류", response.message);
      }
    } catch (err) {
      setError(err.message || "정책 데이터를 가져오는 데 실패했습니다.");
      Alert.alert("오류", err.message || "정책 데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정의 스크랩 토글 함수
  const toggleScrap = (policyId) => {
    if (scrappedItems.some((scrap) => scrap.id === policyId)) {
      removeScrap(policyId); // 스크랩된 경우 제거
    } else {
      addScrap(policyId); // 스크랩되지 않은 경우 추가
    }
  };

  useEffect(() => {
    fetchAllPolicies();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isSearchFocused) {
        setIsSearchFocused(false);
        return true;
      } else if (isHomeFocused) {
        setIsHomeFocused(false);
        setSelectedItem(null);
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
    const unsubscribe = router.addListener("focus", () => {
      setIsSearchFocused(false);
      setIsHomeFocused(false);
      setSelectedItem(null);
    });

    return unsubscribe;
  }, []);

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
        <TouchableOpacity onPress={fetchPolicies} style={{ marginTop: 20 }}>
          <Text style={{ color: "blue" }}>다시 시도하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      {isSearchFocused ? (
        <SearchFocus />
      ) : isHomeFocused ? (
        <HomeFocus
          selectedItem={selectedItem}
          isScrapped={scrappedItems.some((scrap) => scrap.id === selectedItem?.id)}
          setIsScrapped={(isScrapped) => toggleScrap(selectedItem.id)}
        />
      ) : (
        <FlatList
          data={policies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("HomeFocus", {policyId: item.id}) // 라우트 네임 확인
              }}
            >
              <HomeFrame
                title={item.title}
                company={item.department} 
                startDate={item.startDate}
                endDate={item.endDate}
                category={item.category}
                views={item.views}
                scrapCount={item.scrapCount}
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
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
