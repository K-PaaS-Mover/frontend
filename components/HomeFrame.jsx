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

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  /* margin-top: 50px; */
  /* background-color: #faf; */
`;

const HomeFrame = ({ title, textStyles, category }) => {
  return (
    <View className="mt-[20px] flex-1 justify-center items-center">
      <View className="w-[95%] h-[140px] border-[#DFE3E7] border-[1px] border-solid rounded-[17px]">
        <ButtonRow>
          <View className="w-[83px] h-[26px] rounded-[15px] border-[#D6EDF9] border-[0.3px] border-solid bg-[#D6EDF9]">
            <View className="flex-1 justify-center items-center">
              <Text>{category}</Text>
            </View>
          </View>
        </ButtonRow>
        <Text className={`font-psemibold text-[14px] ${textStyles}`}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HomeFrame;
