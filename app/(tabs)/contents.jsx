import {
  View,
  Text,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";

import HomeFrame from "../../components/HomeFrame";
import ContentsFrame from "../../components/ContentsFrame";

import SearchInput from "../../components/SearchInput";
import SearchFocus from "../../components/SearchFocus";
import Bell from "../../assets/icons/bell.svg";
import Sort from "../../assets/icons/sort.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const SortButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-left: 50px; /* 전체보기와 추천순 사이의 간격 조정 */
`;

const MenuContainer = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 30px;
  justify-content: space-between; /* 좌우 정렬을 위해 space-between */
  align-items: flex-start; /* 상단에 고정 */
  width: 100%;
  /* background-color: #aff; */
`;

const MenuList = styled.View`
  background-color: white;
  margin-right: 5px; /* 여백 조정 */
  width: 150px;
  height: 100%;
`;

const ContentArea = styled.View`
  /* flex: 1; */
  background-color: #e9eaf7ce;
  width: 350px;
  padding-left: 30px;
  margin-left: -5px;
  height: 100%;
`;

const MenuItem = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({ selected, isSubMenuSelected }) =>
    selected && !isSubMenuSelected ? "#e9eaf7ce" : "white"};
`;

const SubMenuItem = styled.TouchableOpacity`
  padding: 5px;
  padding-left: 20px;
  background-color: ${({ selected }) => (selected ? "#e9eaf7ce" : "white")};
`;

const menuItems = [
  { id: "1", title: "메뉴 1", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "2", title: "메뉴 2", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "3", title: "메뉴 3", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "4", title: "메뉴 4", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "5", title: "메뉴 5", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "6", title: "메뉴 6", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "7", title: "메뉴 7", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "8", title: "메뉴 8", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "9", title: "메뉴 9", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "10", title: "메뉴 10", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "11", title: "메뉴 11", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "12", title: "메뉴 12", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "13", title: "메뉴 13", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "14", title: "메뉴 14", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "15", title: "메뉴 15", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "16", title: "메뉴 16", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
  { id: "17", title: "메뉴 17", subMenu: ["작은 메뉴 1", "작은 메뉴 2"] },
];

// const policyData = {
//   "메뉴 1": [
//     {
//       title: "정책1",
//       company: "회사1",
//       period: "09.15 ~ 10.09",
//       id: 1,
//       name: "one",
//       category: "카테고리1",
//       views: "1M",
//       scrap: "2K",
//     },
//     {
//       title: "정책2",
//       company: "회사2",
//       period: "11.15 ~ 12.31",
//       id: 2,
//       name: "two",
//       category: "카테고리2",
//       views: "3M",
//       scrap: "4K",
//     },
//   ],
//   "작은 메뉴 1": [
//     {
//       title: "정책3",
//       company: "회사3",
//       period: "01.15 ~ 03.27",
//       id: 3,
//       name: "three",
//       category: "카테고리3",
//       views: "5M",
//       scrap: "6K",
//     },
//   ],
//   "작은 메뉴 2": [
//     {
//       title: "정책4",
//       company: "회사4",
//       period: "05.21 ~ 08.28",
//       id: 4,
//       name: "four",
//       category: "카테고리4",
//       views: "7M",
//       scrap: "8K",
//     },
//   ],
// };

export const policyData = [
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
];

const Contents = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const searchInputRef = useRef(null);
  const navigation = useNavigation();

  // 메뉴와 서브메뉴에 따라 필터링된 정책 데이터
  const getFilteredPolicyData = () => {
    if (selectedSubMenu) {
      switch (selectedSubMenu) {
        case "작은 메뉴 1":
          return policyData.filter((item) => item.category === "카테고리1");
        case "작은 메뉴 2":
          return policyData.filter((item) => item.category === "카테고리2");
        default:
          return [];
      }
    } else if (selectedMenu) {
      return policyData; // 메인 메뉴를 선택했을 때 모든 정책 데이터 반환
    }
    return [];
  };

  const filteredPolicyData = getFilteredPolicyData();

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

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

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

  const handleMenuPress = (menu) => {
    if (selectedMenu === menu && !selectedSubMenu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
      setSelectedSubMenu(null);
    }
  };

  const handleSubMenuPress = (subMenu) => {
    if (selectedSubMenu === subMenu) {
      setSelectedMenu(null); // 메인 메뉴와 작은 메뉴 선택 해제
      setSelectedSubMenu(null);
    } else {
      setSelectedSubMenu(subMenu);
    }
  };

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
              <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
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
            <ScrollView style={{ width: 150 }} contentContainerStyle={{ flexGrow: 1 }}>
              <MenuList>
                {menuItems.map((item) => (
                  <View key={item.id}>
                    <MenuItem
                      onPress={() => handleMenuPress(item.title)}
                      selected={selectedMenu === item.title}
                      isSubMenuSelected={!!selectedSubMenu}
                    >
                      <Text className="ml-[7px] font-psemibold text-[16px]">{item.title}</Text>
                    </MenuItem>
                    {selectedMenu === item.title &&
                      item.subMenu.map((subMenu, index) => (
                        <SubMenuItem
                          key={index}
                          onPress={() => handleSubMenuPress(subMenu)}
                          selected={selectedSubMenu === subMenu}
                        >
                          <Text className="ml-[4px] font-pregular text-[16px]">{subMenu}</Text>
                        </SubMenuItem>
                      ))}
                  </View>
                ))}
              </MenuList>
            </ScrollView>
            <ScrollView style={{ width: 350 }} contentContainerStyle={{ flexGrow: 1 }}>
              <ContentArea>
                <ButtonRow className="w-[230px] h-[20px] mt-[7px]">
                  <Text className="font-pextralight text-[12px]">전체보기</Text>
                  <SortButton>
                    <Text className="font-pextralight text-[12px]">추천순</Text>
                    <Sort width={12} height={12} />
                  </SortButton>
                </ButtonRow>
                {filteredPolicyData.length > 0 && (
                  <View>
                    {filteredPolicyData.map((item) => (
                      <ContentsFrame
                        key={item.id} // key prop 추가
                        title={item.title}
                        company={item.company}
                        period={item.period}
                        category={item.category}
                        views={item.views}
                        scrap={item.scrap}
                      />
                    ))}
                  </View>
                )}
              </ContentArea>
            </ScrollView>
          </MenuContainer>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Contents;
