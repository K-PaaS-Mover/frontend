import { TouchableOpacity, FlatList, RefreshControl, View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";
import { StatusBar } from "react-native-web";

import SearchInput from "./SearchInput";
import { searchPolicies } from "../../app/(api)/Search"; // 검색 API 함수 import

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 355px;
`;

const SearchFocus = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const searchInputRef = useRef(null); // SearchInput의 ref 생성

  const onRefresh = async () => {
    setRefreshing(true);
    // 리프레시 처리 로직 (필요시 구현)
    setRefreshing(false);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // 검색 함수
  const handleSearch = async (query) => {
    const result = await searchPolicies(query);
    if (result.success) {
      setSearchResults(result.data); // 검색 결과 업데이트
    } else {
      alert("검색 실패: " + result.message); // 검색 실패 메시지 표시
    }
  };

  return (
    <FlatList
      data={searchResults.length > 0 ? searchResults : data} // 검색 결과가 있으면 표시, 없으면 기본 데이터
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mt-[11px] w-full items-center">
          <ButtonRow>
            <Text className="font-psemibold text-[14px]">
              {item.id}. {item.title}
            </Text>
          </ButtonRow>
        </View>
      )}
      ListHeaderComponent={() => (
        <View className="mt-[20px] mb-[10px]">
          <View className="flex-1 items-center justify-center">
            <SearchInput
              ref={searchInputRef}
              value={searchQuery}
              handleChangeText={setSearchQuery}
              onSearch={handleSearch} // 검색 함수 전달
            />
          </View>
          <View className="flex-1 items-center justify-center mt-[40px]">
            <View className="w-[355px]">
              <Text className="font-pbold text-[20px]">인기 검색어</Text>
              <Text className="font-pmedium text-[14px] text-[#989DA3]">
                1주일 간 사람들이 찾아본 정책을 보여드릴게요.
              </Text>
            </View>
          </View>
        </View>
      )}
      ListFooterComponent={() => <View className="h-[9px] w-full bg-[#dfe3e7] mt-[37px]"></View>}
      contentContainerStyle={{ paddingBottom: 30 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

export default SearchFocus;
