import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import Views from "../../assets/icons/views.svg";
import Scrap from "../../assets/icons/scrap.svg";
import { useNavigation } from "expo-router";

// 스타일 정의
const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ContentsFrameContainer = styled.TouchableOpacity`
  width: 300px;
  margin-top: 20px;
  margin-left: -30px;
`;

const ContentsFrame = ({ title, department, views, scrapCount, policyId }) => {
  const navigation = useNavigation();

  return (
    <ContentsFrameContainer onPress={() => navigation.navigate("HomeFocus", { policyId })}>
      <View className="w-full flex-1 justify-center items-center">
        {/* 타이틀 영역 */}
        <View className="w-[250px] h-[85px] border-[#fff] border-[1px] border-solid rounded-[6px] bg-white">
          <View className="mt-[15px] ml-[15px]">
            <Text className="font-psemibold text-[16px]">{title}</Text>
          </View>
        </View>

        {/* ButtonRow 영역 */}
        <View className="flex-row justify-between items-center w-[250px] mt-[-30px] ml-[30px]">
          <Text className={`font-pregular text-[#1B1B1E] text-[14px]`}>{department}</Text>

          <View className="flex-row">
            {/* Views 아이콘 */}
            <ButtonRow className="justify-end items-center w-[80px]">
              <Views width={20} height={20} />
              <Text className="text-[#6D6D7A] font-pregular">{views}</Text>
            </ButtonRow>

            {/* Scrap 아이콘 */}
            <ButtonRow className="justify-end items-center w-[80px] ml-[-30px] mr-[25px]">
              <Scrap width={20} height={20} />
              <Text className="text-[#6D6D7A] font-pregular">{scrapCount}</Text>
            </ButtonRow>
          </View>
        </View>
      </View>
    </ContentsFrameContainer>
  );
};

export default ContentsFrame;
