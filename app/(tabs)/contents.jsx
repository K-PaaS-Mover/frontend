import {
  View,
  Text,
  FlatList,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";

import HomeFrame from "../../components/HomeFrame";

import SearchInput from "../../components/SearchInput";
import SearchFocus from "../../components/SearchFocus";
import Bell from "../../assets/icons/bell.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const MenuContainer = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 33px;
  justify-content: start;
  background-color: #e9eaf7ce;
  margin-top: 20px;
  margin-left: 5px;
  /* background-color: #ffa; */
`;

const MenuList = styled.FlatList`
  background-color: white;
  margin-right: 100px;
`;

const ContentArea = styled.View`
  flex: 1;
  padding: 20px;
`;

const menuItems = [
  { id: "1", title: "메뉴 1", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "2", title: "메뉴 2", subMenu: [] },
  { id: "3", title: "메뉴 3", subMenu: [] },
  { id: "4", title: "메뉴 4", subMenu: [] },
];

const Contents = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
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
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isSearchFocused]);

  useEffect(() => {
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsSearchFocused(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView className="bg-white h-full">
      {isSearchFocused ? (
        <SearchFocus />
      ) : (
        <View className="flex-1 items-center">
          <ButtonRow className="w-[355px]">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
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
          <View className="w-[355px] mt-[39px] mb-[10px]">
            <Text className="font-pbold text-[20px]">카테고리</Text>
            <Text className="font-pregular text-[14px] text-[#989DA3]">
              찾고 싶은 분야를 선택해주세요!
            </Text>
          </View>
          <SearchInput
            ref={searchInputRef}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <MenuContainer>
            <MenuList
              data={menuItems}
              keyExtractor={(item) => item.id}
              style={{
                width: 1, // 원하는 너비
              }}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      // 선택된 메뉴가 현재 선택된 메뉴와 같으면 초기화
                      if (selectedMenu?.id === item.id) {
                        setSelectedMenu(null);
                        setSelectedSubMenu(null); // 상위 메뉴가 초기화되면 작은 메뉴도 초기화
                      } else {
                        setSelectedMenu(item);
                        setSelectedSubMenu(null); // 새로운 상위 메뉴를 선택할 때 작은 메뉴 초기화
                      }
                    }}
                    style={{
                      padding: 10,
                      backgroundColor:
                        selectedMenu?.id === item.id && !selectedSubMenu
                          ? "#e9eaf7ce"
                          : "#fff",
                    }}
                  >
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                  {selectedMenu?.id === item.id && item.subMenu.length > 0 && (
                    <View>
                      {item.subMenu.map((subItem, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setSelectedSubMenu(subItem);
                            setSelectedMenu(item); // 상위 메뉴를 유지
                          }}
                          style={{
                            padding: 10,
                            backgroundColor:
                              selectedSubMenu === subItem
                                ? "#e9eaf7ce"
                                : "#fff",
                            width: "100%", // 수정된 부분
                            borderRadius: 0, // 테두리 반경 설정 (옵션)
                            marginLeft: 10, // 오른쪽으로 이동
                          }}
                        >
                          <Text>{subItem}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              )}
            />
            <ContentArea>
              {selectedMenu ? <HomeFrame /> : <Text>메뉴를 선택해주세요.</Text>}
            </ContentArea>
          </MenuContainer>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Contents;
