import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";

import Bell from "../../assets/icons/bell.svg";
import Main from "../../assets/images/main.svg";

import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import IconButton from "../../components/IconButton";
import CustomButton from "../../components/CustomButton";
import HomeFrame from "../../components/HomeFrame";
import { StatusBar } from "react-native-web";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 50px;
  /* background-color: #faf; */
`;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // recall videos -> if any new videos appeard
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[
          { id: 1, name: "one", category: "카테고리1" },
          { id: 2, name: "two", category: "카테고리2" },
          { id: 3, name: "three", category: "카테고리3" },
        ]}
        // data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HomeFrame title={item.id} category={item.category} />
        )}
        ListHeaderComponent={(item) => (
          <View className="h-[350px] my-[-20px] px-4">
            <View className="flex-1 justify-center items-center">
              <ButtonRow>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => router.replace("/home")}
                >
                  <Text className="font-pblack text-2xl text-[#50c3fac4]">
                    Mate
                  </Text>
                </TouchableOpacity>
                <Bell width={24} height={24} />
              </ButtonRow>
              <SearchInput />
              <ButtonRow className="w-[100%] mt-[20px] ">
                <Text className="text-black text-[14px] font-pbold mr-[20px]">
                  인기
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                    (title) => (
                      <CustomButton
                        key={title}
                        title={title}
                        handlePress={() => router.push("/")}
                        containerStyles={`w-[90px] h-[25px]
                        border-[#DFE3E7] border-[1px] rounded-[8px] mr-[10px]`} // 선택된 버튼에 배경색 적용
                        textStyles={`text-center text-[#DFE3E7] text-[10px]`}
                      />
                    )
                  )}
                </ScrollView>
              </ButtonRow>
              <View className="mt-[30px] mb-[20px]">
                <Main />
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }} // 적절한 padding 추가
        // 화면을 아래로 당기면 새로고침
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
