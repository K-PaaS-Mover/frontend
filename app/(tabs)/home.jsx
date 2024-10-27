import { View, Text, FlatList, Image, RefreshControl, ScrollView, BackHandler } from "react-native";
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
import HomeFocus from "../../components/HomeFocus";

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
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 상태 추가
  const searchInputRef = useRef(null);
  const navigation = useNavigation();
  const [isStarChecked, setIsStarChecked] = useState(false);

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
        setSelectedItem(null); // 뒤로가기 시 선택된 아이템 초기화
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
      setIsHomeFocused(false);
      setSelectedItem(null); // 화면이 포커스될 때 선택된 아이템 초기화
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView className="bg-white h-full">
      {isSearchFocused ? (
        <SearchFocus />
      ) : isHomeFocused ? ( // isHomeFocused가 true일 때 HomeFocus 표시
        <HomeFocus
          selectedItem={selectedItem}
          isStarChecked={isStarChecked}
          setIsStarChecked={setIsStarChecked}
        />
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
            <TouchableOpacity
              onPress={() => {
                setIsHomeFocused(true);
                setSelectedItem(item);
              }} // HomeFrame 클릭 시 HomeFocus 표시
            >
              <HomeFrame
                title={item.title}
                company={item.company}
                period={item.period}
                category={item.category}
                views={item.views}
                scrap={item.scrap}
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
                      router.replace("/home");
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
                          router.push("/");
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
