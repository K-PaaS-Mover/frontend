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
    <View className="mt-[25px] flex-1 justify-center items-center">
      <View className="w-[95%] h-[140px] border-[#DFE3E7] border-[1px] border-solid rounded-[17px]">
        <ButtonRow className="mt-[10px] items-center">
          <View className="w-[83px] h-[26px] rounded-[15px] border-[#D6EDF9] border-[0.3px] border-solid bg-[#D6EDF9]">
            <View className="h-full items-center justify-center">
              <Text>{category}</Text>
            </View>
          </View>
          <ButtonRow className="w-[130px] justify-center">
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
        <Text className={`mt-[15px] ml-[20px] font-psemibold text-[18px]`}>
          {title}
        </Text>
        <Text
          className={`mt-[9px] ml-[20px] font-pregular text-[#1B1B1E] text-[14px]`}
        >
          {company}
        </Text>
        <Text className={`ml-[20px] font-pregular text-[#1B1B1E] text-[14px]`}>
          기간 : {period}
        </Text>
      </View>
    </View>
  );
};

export default ContentsFrame;
