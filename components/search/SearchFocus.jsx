import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import SearchInput from "./SearchInput";
import { searchPolicies } from "../../app/(api)/Search";

const SearchFocus = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const searchInputRef = useRef(null);

  const data = useMemo(() => [
    { id: 1, title: "가사 간병" },
    { id: 2, title: "장애인 자립" },
    { id: 3, title: "고령 장애" },
    { id: 4, title: "자립 정착금" },
    { id: 5, title: "청년" },
  ], []);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = async (query) => {
    const result = await searchPolicies(query);
    if (result.success) {
      setSearchResults(result.data);
    } else {
      alert("검색 실패: " + result.message);
    }
  };

  return (
    <FlatList
      data={searchResults.length > 0 ? searchResults : data}
      keyExtractor={(item) => item.id.toString()}
      extraData={searchResults} // 리렌더링 방지
      renderItem={({ item }) => (
        <View style={{ marginTop: 11, width: "100%", alignItems: "center" }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 355 }}>
            <Text style={{ fontWeight: "600", fontSize: 14 }}>
              {item.id}. {item.title}
            </Text>
          </View>
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <SearchInput
              ref={searchInputRef}
              value={searchQuery}
              handleChangeText={setSearchQuery}
              onSearch={handleSearch}
            />
          </View>
        </View>
      )}
      ListFooterComponent={() => <View style={{ height: 9, width: "100%", backgroundColor: "#dfe3e7", marginTop: 37 }} />}
      contentContainerStyle={{ paddingBottom: 30 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

export default SearchFocus;
