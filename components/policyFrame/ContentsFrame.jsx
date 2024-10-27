import { View, Text, FlatList, Image, RefreshControl, ScrollView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";

import Views from "../../assets/icons/views.svg";
import Scrap from "../../assets/icons/scrap.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

const ContentsFrame = ({ title, company, period, category, views, scrap }) => {
  return (
    <View className="w-[300px] mt-[20px]">
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
                  <Scrap width={20} height={20} marginRight={5} />
                  <Text className="text-[#6D6D7A] font-pregular">{scrap}</Text>
                </ButtonRow>
              </ButtonRow>
            </ButtonRow>
          </ButtonRow>
          <Text className={`mt-[9px] ml-[23px] font-pregular text-[#1B1B1E] text-[14px]`}>
            {company}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ContentsFrame;
