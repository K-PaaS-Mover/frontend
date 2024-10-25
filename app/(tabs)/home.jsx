import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";
import { StatusBar } from "react-native-web";

import Bell from "../../assets/icons/bell.svg";
import Main from "../../assets/images/main.svg";

import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import IconButton from "../../components/IconButton";
import CustomButton from "../../components/CustomButton";
import HomeFrame from "../../components/HomeFrame";
import SearchFocus from "../../components/SearchFocus";

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
  const searchInputRef = useRef(null); // SearchInput의 ref 생성
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
        return true; // 뒤로가기를 처리했음을 알림
      }
      return false; // 뒤로가기를 기본 동작으로 처리하게 함
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isSearchFocused]);

  useEffect(() => {
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus(); // isSearchFocused가 true일 때 포커스 설정
    }
  }, [isSearchFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsSearchFocused(false); // Home 탭이 포커스될 때 SearchFocus 해제
    });

    return unsubscribe; // 클린업 함수로 리스너 해제
  }, [navigation]);

  return (
    <SafeAreaView className="bg-white h-full">
      {isSearchFocused ? (
        <SearchFocus />
      ) : (
        <FlatList
          data={[
            {
              title: "정책1",
              company: "회사1",
              period: "09.15 ~ 10.09",
              id: 1,
              name: "one",
              category: "카테고리1",
              views: "1M",
              scrap: "2K",
            },
            {
              title: "정책2",
              company: "회사2",
              period: "11.15 ~ 12.31",
              id: 2,
              name: "two",
              category: "카테고리2",
              views: "3M",
              scrap: "4K",
            },
            {
              title: "정책3",
              company: "회사3",
              period: "01.15 ~ 03.27",
              id: 3,
              name: "three",
              category: "카테고리3",
              views: "5M",
              scrap: "6K",
            },
            {
              title: "정책4",
              company: "회사4",
              period: "05.21 ~ 08.28",
              id: 4,
              name: "four",
              category: "카테고리4",
              views: "7M",
              scrap: "8K",
            },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HomeFrame
              title={item.title}
              company={item.company}
              period={item.period}
              category={item.category}
              views={item.views}
              scrap={item.scrap}
            />
          )}
          ListHeaderComponent={() => (
            <View className="h-[350px] my-[-25px] px-4">
              <View className="flex-1 justify-center items-center">
                <ButtonRow>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      // Home 탭 클릭 시 메인 화면 표시
                      setIsSearchFocused(false);
                      router.replace("/home");
                    }}
                  >
                    <Text className="font-pblack text-2xl text-[#50c3fac4]">
                      Mate
                    </Text>
                  </TouchableOpacity>
                  <Bell width={24} height={24} />
                </ButtonRow>
                <SearchInput
                  ref={searchInputRef}
                  onFocus={() => setIsSearchFocused(true)} // 포커스 시 호출
                  onBlur={() => setIsSearchFocused(false)}
                />
                <ButtonRow className="w-[100%] mt-[30px] ">
                  <Text className="text-black text-[14px] font-pbold mr-[20px]">
                    인기
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
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
                          setIsSearchFocused(false); // SearchFocus 해제
                          router.push("/"); // 원하는 페이지로 이동
                        }}
                        containerStyles={`w-[90px] h-[25px]
                        border-[#DFE3E7] border-[1px] rounded-[8px] mr-[10px]`} // 선택된 버튼에 배경색 적용
                        textStyles={`text-center text-[#515259] text-[12px] font-pregular`}
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
          contentContainerStyle={{ paddingBottom: 30 }} // 적절한 padding 추가
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
