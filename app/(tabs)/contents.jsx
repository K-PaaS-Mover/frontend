import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScrap } from "../ScrapContext";
import ContentsFrame from "../../components/policyFrame/ContentsFrame";
import SearchInput from "../../components/search/SearchInput";
import SearchFocus from "../../components/search/SearchFocus";
import Bell from "../../assets/icons/bell.svg";
import Sort from "../../assets/icons/sort.svg";
import { getPoliciesByCategory } from "../(api)/Policy";

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
  margin-right: 50px;
  margin-top: -20px;
`;

const MenuContainer = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 30px;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const MenuList = styled.View`
  background-color: white;
  margin-right: 20px;
  width: 200px;
  height: 100%;
`;

const ContentArea = styled.View`
  background-color: #e9eaf7ce;
  width: 300px;
  padding-left: 30px;
  margin-left: -5px;
  height: 100%;
`;

const MenuItem = styled.TouchableOpacity`
  padding: 10px;
  padding-top: 15px;
  background-color: ${({ selected }) => (selected ? "#e9eaf7ce" : "white")};
`;

const SubMenuItem = styled.TouchableOpacity`
  padding: 5px;
  padding-left: 20px;
  background-color: ${({ selected }) => (selected ? "#e9eaf7ce" : "white")};
`;

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
  const [sortOrder, setSortOrder] = useState("추천순");

  const searchInputRef = useRef(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPolicies();
    setRefreshing(false);
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === "추천순" ? "최신순" : "추천순"));
  };

  useEffect(() => {
    fetchPolicies();
  }, [selectedMenu, selectedSubMenu]);

  useEffect(() => {
    const sortedPolicies = [...policyData].sort((a, b) => {
      if (sortOrder === "추천순") return b.scrap - a.scrap;
      return new Date(b.startDate) - new Date(a.startDate);
    });
    setPolicyData(sortedPolicies);
  }, [sortOrder]);

  const fetchPolicies = async () => {
    const categories = selectedSubMenu
      ? [selectedSubMenu]
      : selectedMenu
      ? menuItems.find((item) => item.title === selectedMenu).subMenu
      : [];

    console.log("Fetching policies for categories:", categories);

    try {
      setLoading(true);
      const response = await getPoliciesByCategory(categories);
      console.log("API response:", response);
      if (response.success) {
        setPolicyData(response.data);
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

  const handleMenuPress = (menu) => {
    setSelectedMenu(menu === selectedMenu ? null : menu);
    setSelectedSubMenu(null);
  };

  const handleSubMenuPress = (subMenu) => {
    setSelectedSubMenu(subMenu === selectedSubMenu ? null : subMenu);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {isSearchFocused ? (
        <SearchFocus />
      ) : (
        <View className="flex-1 items-center">
          <ButtonRow className="w-[355px]">
            <TouchableOpacity activeOpacity={1} onPress={() => setIsSearchFocused(false)}>
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
                    >
                      <Text className="ml-[7px] font-psemibold text-[16px]">{item.title}</Text>
                    </MenuItem>
                    {selectedMenu === item.title &&
                      item.subMenu.map((subMenu) => (
                        <SubMenuItem
                          key={subMenu}
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
            <ContentArea>
              <ButtonRow>
                <TouchableOpacity onPress={handleSort}>
                  <SortButton>
                    <Sort width={22} height={22} />
                    <Text className="ml-[5px] font-psemibold text-[16px]">{sortOrder}</Text>
                  </SortButton>
                </TouchableOpacity>
              </ButtonRow>
              {loading ? (
                <ActivityIndicator size="large" color="#50c3fa" />
              ) : (
                <ScrollView
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                  {policyData.length > 0 ? (
                    policyData.map((policy) => (
                      <ContentsFrame
                        key={policy.id}
                        policy={policy}
                        onScrap={scrappedItems.includes(policy.id) ? removeScrap : addScrap}
                      />
                    ))
                  ) : (
                    <Text className="text-center text-lg">정책이 없습니다.</Text>
                  )}
                </ScrollView>
              )}
            </ContentArea>
          </MenuContainer>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Contents;
