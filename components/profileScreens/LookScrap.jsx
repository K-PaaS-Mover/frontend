import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Bell from "../../assets/icons/bell.svg";
import { useScrap } from "../../app/ScrapContext"; // 경로를 확인
import { useNavigation } from "@react-navigation/native";

import HomeFrame from "../policyFrame/HomeFrame";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const LookScrap = () => {
  const { scrappedItems } = useScrap(); // 스크랩 아이템 가져오기
  console.log("Scrapped Items: ", scrappedItems);

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="flex-1 justify-center items-center px-4">
        <ButtonRow>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.replace("Home")}>
            <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
          </TouchableOpacity>
          <Text className="font-pbold text-[20px] pr-[35px]">스크랩</Text>
          <Bell width={24} height={24} />
        </ButtonRow>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {scrappedItems.length === 0 ? ( // length 체크
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
            data={scrappedItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HomeFrame
                title={item.title}
                company={item.company}
                period={item.period}
                category={item.category}
                views={item.views}
                scrap={item.scrap}
              />
            )}
            contentContainerStyle={{ padding: 20 }} // padding 추가
            showsVerticalScrollIndicator={false} // 스크롤 바 숨기기
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LookScrap;
