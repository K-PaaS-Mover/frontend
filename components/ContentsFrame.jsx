import { View, Text, FlatList, Image, RefreshControl, ScrollView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";

import Views from "../assets/icons/views.svg";
import Scrap from "../assets/icons/scrap.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* margin-top: 50px; */
  /* background-color: #faf; */
  padding: 0 20px;
`;

const ContentsFrame = ({ title, company, period, category, views, scrap }) => {
  return (
    <View className="w-[300px] pr-[20px] mt-[10px]">
      <View className="w-full flex-1 justify-center items-center">
        <View className="w-full h-[85px] border-[#fff] border-[1px] border-solid rounded-[17px] bg-white">
          <ButtonRow className="mt-[10px] items-center">
            <ButtonRow className="w-[230px] justify-center">
              <Text className={`mt-[15px] ml-[20px] font-psemibold text-[18px]`}>{title}</Text>
              <ButtonRow className="w-[80px] justify-center">
                <Views width={20} height={20} marginRight={5} />
                <Text className="text-[#6D6D7A] font-pregular">{views}</Text>
              </ButtonRow>
              <ButtonRow className="w-[80px] justify-center ml-[-20px]">
                <Scrap width={20} height={20} marginRight={5} />
                <Text className="text-[#6D6D7A] font-pregular">{scrap}</Text>
              </ButtonRow>
            </ButtonRow>
          </ButtonRow>
          <Text className={`mt-[9px] ml-[20px] font-pregular text-[#1B1B1E] text-[14px]`}>
            {company}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ContentsFrame;
