import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";

import bell from "../../assets/icons/bell.png";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import IconButton from "../../components/IconButton";
import CustomButton from "../../components/CustomButton";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: -30px;
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
      {/* <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className="text-3xl text-black">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="text-2xl font-psemibold text-gray-100">
                    Mate
                  </Text>
                </View>
                <View className="mr-[-30px]">
                  <IconButton
                    type={bell}
                    style="w-[30px] h-[33px]"
                    onPress={() => router.push("/")}
                  />
                </View>
              </View>
              <SearchInput />

              <View className="w-full flex-1 pt-[24px]">
                <ButtonRow>
                  <Text className="text-black text-[14px] font-pbold mr-[10px]">
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
                          containerStyles={`w-[40px] h-[20.74px]
                      border-[#DFE3E7] border-[1px] rounded-[8px]}`} // 선택된 버튼에 배경색 적용
                          textStyles={`text-center text-[#DFE3E7] text-[10px]`}
                        />
                      )
                    )}
                  </ScrollView>
                </ButtonRow>
              </View>
              <Trending posts={[{ id: 1 }, { id: 2 }] ?? []} />
            </View>
          </>
        )}
        // 화면을 아래로 당기면 새로고침
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> */}
      <Text>hello</Text>
    </SafeAreaView>
  );
};

export default Home;
