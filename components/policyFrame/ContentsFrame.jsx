// components/policyFrame/ContentsFrame.jsx

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Views from "../../assets/icons/views.svg";
import Scrap from "../../assets/icons/scrap.svg";
import Star from "../../assets/icons/star.svg";
import StarCheck from "../../assets/icons/star_filled.svg";
import { useNavigation } from "expo-router";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

const ContentsFrameContainer = styled.TouchableOpacity`
  width: 300px;
  margin-top: 20px;
`;

const ContentsFrame = ({
  title,
  department,
  period,
  category,
  views,
  scrapCount,
  policyId,
  isScrapped,
  toggleScrap,
}) => {
  const navigation = useNavigation();

  return (
    <ContentsFrameContainer onPress={() => navigation.navigate("HomeFocus",{policyId})}>
      <View className="w-full flex-1 justify-center items-center">
        <View className="w-[250px] h-[85px] ml-[-60px] border-[#fff] border-[1px] border-solid rounded-[6px] bg-white">
          <ButtonRow className="items-center mt-[10px]">
            <ButtonRow className="w-[250px] justify-between ml-[-20px]">
              <Text className="font-psemibold text-[18px]">{title}</Text>
              <ButtonRow className="w-[100px] justify-center">
                <ButtonRow className="justify-center mr-[-10px]">
                  <Views width={20} height={20} marginRight={5} />
                  <Text className="text-[#6D6D7A] font-pregular">{views}</Text>
                </ButtonRow>
                <ButtonRow className="justify-center">
                  <TouchableOpacity onPress={() => toggleScrap(policyId)}>
                    {isScrapped ? (
                      <StarCheck width={20} height={20} marginRight={5} />
                    ) : (
                      <Star width={20} height={20} marginRight={5} />
                    )}
                  </TouchableOpacity>
                  <Text className="text-[#6D6D7A] font-pregular">{scrapCount}</Text>
                </ButtonRow>
              </ButtonRow>
            </ButtonRow>
          </ButtonRow>
          <Text className={`mt-[9px] ml-[23px] font-pregular text-[#1B1B1E] text-[14px]`}>
            {department}
          </Text>
          <Text className={`ml-[23px] font-pregular text-[#1B1B1E] text-[14px]`}>기간: {period}</Text>
        </View>
      </View>
    </ContentsFrameContainer>
  );
};

export default ContentsFrame;
