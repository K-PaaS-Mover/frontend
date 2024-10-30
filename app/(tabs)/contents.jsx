// contents.js
import {
  View,
  Text,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SectionList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";

import { useScrap } from "../ScrapContext";
import ContentsFrame from "../../components/policyFrame/ContentsFrame";
import SearchInput from "../../components/search/SearchInput";
import SearchFocus from "../../components/search/SearchFocus";
import Bell from "../../assets/icons/bell.svg";
import Sort from "../../assets/icons/sort.svg";

import { getPoliciesByCategory, checkScrapStatus } from "../(api)/Policy"; // API 함수 가져오기

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
`;

const MenuList = styled.View`
  background-color: white;
  margin-right: 5px; /* 여백 조정 */
  width: 150px;
  height: 100%;
`;

const ContentArea = styled.View`
  background-color: #e9eaf7ce;
  width: 350px;
  padding-left: 30px;
  margin-left: -5px;
  height: 100%;
`;

const MenuItem = styled.TouchableOpacity`
  padding: 10px;
  padding-top: 15px;
  background-color: ${({ selected, isSubMenuSelected }) =>
    selected && !isSubMenuSelected ? "#e9eaf7ce" : "white"};
`;

const SubMenuItem = styled.TouchableOpacity`
  padding: 5px;
  padding-left: 20px;
  background-color: ${({ selected }) => (selected ? "#e9eaf7ce" : "white")};
`;

// 새로운 카테고리 구조 반영
const menuItems = [
  {
    id: "1",
    title: "서비스",
    subMenu: ["돌봄", "어르신", "중장년", "장애인", "자활", "여성가족"],
  },
  {
    id: "2",
    title: "생애주기",
    subMenu: ["임산/출산", "영유아", "아동", "청소년", "청년", "중장년", "어르신"],
  },
  {
    id: "3",
    title: "생활지원",
    subMenu: ["자립", "일자리", "교육", "금융", "주택", "의료", "시설"],
  },
  {
    id: "4",
    title: "가구",
    subMenu: ["가족", "한부모", "다문화", "보훈"],
  },
];

const Contents = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const { scrappedItems, addScrap, removeScrap } = useScrap();

  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("추천순"); // 기본 정렬 순서 설정

  const searchInputRef = useRef(null);
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPolicies();
    setRefreshing(false);
  };

  const fetchPolicies = async () => {
    let categories = [];
    if (selectedSubMenu) {
      // 서브 메뉴 선택 시 해당 카테고리 하나
      categories = [selectedSubMenu];
    } else if (selectedMenu) {
      // 메인 메뉴 선택 시 해당 메인 메뉴의 모든 서브 메뉴
      const menuItem = menuItems.find((item) => item.title === selectedMenu);
      if (menuItem) {
        categories = menuItem.subMenu;
      }
    }

    console.log("Fetching policies with categories:", categories); // 디버깅용 로그

    try {
      setLoading(true);
      const response = await getPoliciesByCategory(categories);
      if (response.success) {
        console.log("Fetched policies:", response.data); // 디버깅용 로그
        setPolicyData(response.data);
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

  const handleSort = () => {
    if (sortOrder === "추천순") {
      setSortOrder("최신순");
    } else {
      setSortOrder("추천순");
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [selectedMenu, selectedSubMenu]);

  useEffect(() => {
    const sortPolicies = () => {
      const sortedPolicies = [...policyData];
      if (sortOrder === "추천순") {
        sortedPolicies.sort((a, b) => b.scrap - a.scrap);
      } else if (sortOrder === "최신순") {
        sortedPolicies.sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
      }
      return sortedPolicies;
    };

    const sortedPolicies = sortPolicies();
    setPolicyData(sortedPolicies);
  }, [sortOrder, policyData.length]); // policyData.length를 추가하여 무한 루프 방지

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

  const handleMenuPress = (menu) => {
    console.log("Selected Menu:", menu); // 로그 추가

    if (selectedMenu === menu && !selectedSubMenu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
      setSelectedSubMenu(null);
    }
  };

  const handleSubMenuPress = (subMenu) => {
    console.log("Selected SubMenu:", subMenu); // 로그 추가
    if (selectedSubMenu === subMenu) {
      setSelectedMenu(null); // 메인 메뉴와 작은 메뉴 선택 해제
      setSelectedSubMenu(null);
    } else {
      setSelectedSubMenu(subMenu);
    }
  };

  // 스크랩 상태 확인 함수는 비동기 함수로 유지할 필요 없으므로 제거

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
    setPolicyData((prev) =>
      prev.map((item) =>
        item.id === policyId
          ? { ...item, isScrapped: !item.isScrapped }
          : item
      )
    );
  };

  // 정책 데이터를 카테고리별로 그룹화하는 함수
  const groupPoliciesByCategory = (policies) => {
    return policies.reduce((groups, policy) => {
      const categories = policy.categories; // 정책의 카테고리 배열
      categories.forEach((category) => {
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(policy);
      });
      return groups;
    }, {});
  };

  const groupedPolicies = groupPoliciesByCategory(policyData);

  // SectionList를 위한 섹션 데이터 생성
  const sections = menuItems.flatMap((menu) =>
    menu.subMenu.map((subMenu) => ({
      title: subMenu,
      data: groupedPolicies[subMenu] || [],
    }))
  );

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
            <ScrollView
              style={{ width: 150 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <MenuList>
                {menuItems.map((item) => (
                  <View key={item.id}>
                    <MenuItem
                      onPress={() => handleMenuPress(item.title)}
                      selected={selectedMenu === item.title}
                      isSubMenuSelected={!!selectedSubMenu}
                    >
                      <Text className="ml-[7px] font-psemibold text-[16px]">
                        {item.title}
                      </Text>
                    </MenuItem>
                    {selectedMenu === item.title &&
                      item.subMenu.map((subMenu, index) => (
                        <SubMenuItem
                          key={index}
                          onPress={() => handleSubMenuPress(subMenu)}
                          selected={selectedSubMenu === subMenu}
                        >
                          <Text className="ml-[4px] font-pregular text-[16px]">
                            {subMenu}
                          </Text>
                        </SubMenuItem>
                      ))}
                  </View>
                ))}
              </MenuList>
            </ScrollView>
            <ScrollView
              style={{ width: 350 }}
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <ContentArea>
                <ButtonRow className="w-[230px] h-[20px] mt-[7px]">
                  <Text className="font-pextralight text-[12px]">전체보기</Text>
                  <SortButton onPress={handleSort}>
                    <Text className="font-pextralight text-[12px]">
                      {sortOrder}
                    </Text>
                    <Sort width={12} height={12} />
                  </SortButton>
                </ButtonRow>
                {loading ? (
                  <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                ) : error ? (
                  <View className="flex-1 justify-center items-center mr-[80px]">
                    <Text>Error: {error}</Text>
                    <TouchableOpacity onPress={fetchPolicies} style={{ marginTop: 20 }}>
                      <Text style={{ color: "blue" }}>다시 시도하기</Text>
                    </TouchableOpacity>
                  </View>
                ) : policyData.length > 0 ? (
                  <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderSectionHeader={({ section: { title } }) => (
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        {title}
                      </Text>
                    )}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("HomeFocus", {
                            selectedItem: item,
                            policyId: item.id,
                          })
                        }
                      >
                        <ContentsFrame
                          title={item.title}
                          department={item.department}
                          startDate={item.startDate}
                          endDate={item.endDate}
                          categories={item.categories}
                          views={item.views}
                          scrapCount={item.scrapCount}
                          policyId={item.id}
                          isScrapped={scrappedItems.some(
                            (scrap) => scrap.id === item.id
                          )}
                          toggleScrap={toggleScrap}
                        />
                      </TouchableOpacity>
                    )}
                    stickySectionHeadersEnabled={false} // 필요에 따라 조정
                  />
                ) : (
                  <View className="flex-1 justify-center items-center mr-[80px]">
                    <Text>해당 카테고리에 대한 정책이 없습니다.</Text>
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
