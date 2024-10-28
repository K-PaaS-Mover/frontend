import { View, Text, FlatList, RefreshControl, BackHandler } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Bell from "../../assets/icons/bell.svg";
import HomeFrame from "../policyFrame/HomeFrame";

import { useScrap } from "../../app/ScrapContext";
import { useUser } from "../../app/UserContext";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const LookScrap = () => {
  const { scrapItems = [] } = useScrap(); // scrapItems에 기본값 설정

  return (
    // 스크랩된 정책 화면
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 justify-center items-center px-4 mt-[-30px]">
        <ButtonRow>
          <TouchableOpacity activeOpacity={1} onPress={() => router.replace("/home")}>
            <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
          </TouchableOpacity>
          <Text className="font-pbold text-[20px] pr-[35px]">스크랩</Text>
          <Bell width={24} height={24} />
        </ButtonRow>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {scrapItems.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-[300px]">
            <Text className="font-plight text-[16px] text-[#989da3]">
              아직 스크랩한 정책이 없습니다
            </Text>
            <Text className="font-plight text-[16px] text-[#989da3]">
              홈으로 들어가 여러 정책들로
            </Text>
            <Text className="font-plight text-[16px] text-[#989da3]">혜택을 받으세요!</Text>
          </View>
        ) : (
          <FlatList
            data={scrapItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HomeFrame
                title={item.title}
                company={item.company}
                period={item.period}
                category={item.category}
                views={item.views}
                scrap={item.scrap}
                isScrapped={true} // 스크랩된 상태로 표시
                toggleScrap={() => {}} // 제거할 필요 없으므로 빈 함수
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LookScrap;
