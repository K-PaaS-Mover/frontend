import {
  TouchableOpacity,
  FlatList,
  RefreshControl,
  View,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";
import { StatusBar } from "react-native-web";

import SearchInput from "./SearchInput";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 355px;
  /* background-color: #faf; */
`;
const SearchFocus = () => {
  const [refreshing, setRefreshing] = useState(false);
  const searchInputRef = useRef(null); // SearchInput의 ref 생성

  const data = [
    { id: 1, title: "인기 검색어1" },
    { id: 2, title: "인기 검색어2" },
    { id: 3, title: "인기 검색어3" },
    { id: 4, title: "인기 검색어4" },
    { id: 5, title: "인기 검색어5" },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // 리프레시 처리 로직
    setRefreshing(false);
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 포커스 설정
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
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
            <SearchInput ref={searchInputRef} />
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
      ListFooterComponent={() => (
        <View className="mt-[25px] h-[9px] w-full bg-[#dfe3e7] mt-[37px]"></View>
      )}
      contentContainerStyle={{ paddingBottom: 30 }} // 적절한 padding 추가
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default SearchFocus;
