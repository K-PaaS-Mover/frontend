// SearchFocus.js
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { TouchableOpacity, FlatList, RefreshControl, View, Text } from "react-native";
import styled from "styled-components/native";
import SearchInput from "./SearchInput";
import { searchPolicies } from "../../app/(api)/Search";
import HomeFrame from "../policyFrame/HomeFrame"; 

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

  // 인기 검색어 데이터
  const data = useMemo(() => [
    { id: 1, title: "가사 간병" },
    { id: 2, title: "장애인 자립" },
    { id: 3, title: "고령 장애" },
    { id: 4, title: "자립 정착금" },
    { id: 5, title: "청년" },
  ], []);

  // 리프레시 핸들러
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // 리프레시 처리 로직 추가 가능
    setRefreshing(false);
  }, []);

  // 컴포넌트 마운트 시 검색 입력 포커스 설정
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // 검색 핸들러
  const handleSearch = useCallback(async (query) => {
    try {
      const result = await searchPolicies(query);
      console.log("handleSearch result = ", result);
      if (result.success && Array.isArray(result.data)) {
        setSearchResults(result.data); // 검색 결과 상태 업데이트
      } else {
        alert("검색 실패: " + result.message);
        setSearchResults([]); // 검색 실패 시 결과 초기화
      }
    } catch (error) {
      console.error("검색 오류:", error);
      alert("검색 중 오류가 발생했습니다.");
      setSearchResults([]); // 오류 시 결과 초기화
    }
  }, []);

  // 텍스트 변경 핸들러
  const handleChangeText = useCallback((text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setSearchResults([]); // 검색어가 비어있으면 검색 결과 초기화
    }
    // 필요하다면 실시간 검색 로직 추가 가능
  }, []);

  const handleFocus = useCallback(() => {
    console.log("SearchInput focused");
    // 추가 포커스 로직
  }, []);

  const handleBlur = useCallback(() => {
    console.log("SearchInput blurred");
    // 추가 블러 로직
  }, []);

  // 인기 검색어 헤더 렌더링
  const renderHeader = useCallback(() => (
    <View style={{ marginTop: 20, marginBottom: 10 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SearchInput
          ref={searchInputRef}
          value={searchQuery}
          handleChangeText={handleChangeText}
          onSearch={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  ), [searchQuery, handleChangeText, handleSearch, handleFocus, handleBlur]);

  // 인기 검색어 아이템 렌더링
  const renderStaticItem = useCallback(({ item }) => (
    <VIew>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 }}>
      <View style={{ width: 355 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>인기 검색어</Text>
        <Text style={{ fontWeight: "500", fontSize: 14, color: "#989DA3" }}>
          1주일 간 사람들이 찾아본 정책을 보여드릴게요.
        </Text>
      </View>
        </View>
      <View style={{ marginTop: 11, width: "100%", alignItems: "center" }}>
        <ButtonRow>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {item.id}. {item.title}
          </Text>
        </ButtonRow>
      </View>
    </VIew>
  ), []);

  // 인기 검색어 푸터 렌더링
  const renderFooter = useCallback(() => (
    <View style={{ height: 9, width: "100%", backgroundColor: "#dfe3e7", marginTop: 37 }} />
  ), []);

  // 검색 결과 아이템 렌더링 (HomeFrame 사용)
  const renderHomeFrameItem = useCallback(({ item }) => (
    <HomeFrame {...item} />
  ), []);

  return (
    <View style={{ flex: 1 }}>
      {searchResults.length > 0 ? (
        // 검색 결과가 있을 때 HomeFrame 렌더링
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHomeFrameItem}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 30 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        // 검색 결과가 없을 때 인기 검색어 리스트 렌더링
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStaticItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ paddingBottom: 30 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
};

export default SearchFocus;
