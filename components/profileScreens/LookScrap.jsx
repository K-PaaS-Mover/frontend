import { View, Text, FlatList, RefreshControl, BackHandler } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Bell from "../../assets/icons/bell.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const LookScrap = () => {
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
    </SafeAreaView>
  );
};

export default LookScrap;
