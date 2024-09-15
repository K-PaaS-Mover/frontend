import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { Redirect, router } from "expo-router";
import "nativewind"; // 추가: nativewind를 불러옵니다.
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import React from "react";

// import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import MyCircle from "../components/MyCircle";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 220px;
  margin-top: 25px;
`;

export default function App() {
  return (
    <SafeAreaView className="h-full bg-[#1b1b1e] pt-[20px]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <MyCircle />
          <Text className="text-[18px] font-pblack text-white mt-[200px] text-center">
            당신에게 필요한 정보를 한 번에
          </Text>
          <Container>
            <CustomButton
              title="카카오로 시작하기"
              handlePress={() => router.push("/")}
              containerStyles="w-[285px] h-[57px] bg-[#F6E41E]"
              textStyles="text-black text-center"
            />
            <CustomButton
              title="로그인"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-[285px] h-[57px] border-2 border-[#C1C6CD] mt-[15px]"
              textStyles="text-white"
            />
            <ButtonRow>
              <CustomButton
                title="회원가입"
                handlePress={() => router.push("/sign-up")}
                textStyles="text-white"
              />
              <CustomButton
                title="비회원으로 시작"
                handlePress={() => router.push("/")}
                textStyles="text-white"
              />
            </ButtonRow>
          </Container>
        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
}
