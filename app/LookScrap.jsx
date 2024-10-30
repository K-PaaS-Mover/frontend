// LookScrap.jsx
import { View, Text, FlatList, Image, RefreshControl, ScrollView, BackHandler } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import styled from "styled-components/native";

import { StarContext } from "./StarContext"; // StarContext import
import HomeFrame from "../components/policyFrame/HomeFrame";

import Bell from "../assets/icons/bell.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const LookScrap = () => {
  const navigation = useNavigation(); // useNavigation으로 navigation 객체 가져오기
  const { scrappedItems } = useContext(StarContext); // 스크랩 아이템 가져오기

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 justify-center items-center px-4 mt-[30px]">
        <ButtonRow className="w-[355px] mt-[-10px]">
          <TouchableOpacity activeOpacity={1} onPress={() => router.replace("/home")}>
            <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
          </TouchableOpacity>
          <Text className="font-pbold text-[20px] pr-[35px]">스크랩</Text>
          <Bell width={24} height={24} />
        </ButtonRow>
      </View>
      <View style={{ flex: 1 }}>
        {scrappedItems.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-[300px]">
            <Text className="font-plight text-[16px] text-[#989da3]">
              아직 스크랩한 정책이 없습니다.
            </Text>
            <Text className="font-plight text-[16px] text-[#989da3]">
              홈으로 들어가 여러 정책들로
            </Text>
            <Text className="font-plight text-[16px] text-[#989da3]">혜택을 받으세요!</Text>
          </View>
        ) : (
          <FlatList
            data={scrappedItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HomeFocus", { selectedItem: item, policyId: item.id })
                }
              >
                <HomeFrame
                  title={item.title}
                  department={item.department}
                  period={item.period}
                  categories={Array.isArray(item.categories) ? item.categories : [item.categories]}
                  views={item.views}
                  scrapCount={item.scrapCount}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LookScrap;
