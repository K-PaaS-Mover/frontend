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
  width: 95%;
  margin-top: 50px;
  /* background-color: #faf; */
`;
const SearchFocus = () => {
  const [refreshing, setRefreshing] = useState(false);
  const searchInputRef = useRef(null); // SearchInput의 ref 생성

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
      // data={[]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      ListHeaderComponent={(item) => (
        <View className="flex-1 items-center justify-center">
          <SearchInput ref={searchInputRef} />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 30 }} // 적절한 padding 추가
      // 화면을 아래로 당기면 새로고침
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default SearchFocus;
