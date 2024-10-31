import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import { router } from "expo-router";
import "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CustomButton from "../components/signComponents/CustomButton";
import MyCircle from "../components/mainComponents/MyCircle";
import { UserProvider } from "./UserContext"; // UserProvider를 불러옵니다.
import { isSignedIn } from "./(api)/signIn";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
  margin-top: 25px;
`;

const AppContent = () => {

  return (
    <SafeAreaView className="h-full bg-[#1b1b1e] pt-[20px]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <MyCircle />
          <Text className="text-[18px] font-pblack text-white mt-[180px] text-center">
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
                handlePress={() => router.push("/sign-up-agree")}
                textStyles="text-white"
              />
              <CustomButton
                title="비회원으로 시작"
                handlePress={() => router.push("/home")}
                textStyles="text-white"
              />
            </ButtonRow>
          </Container>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const checkSignInStatus = async () => {
    const signedIn = await isSignedIn();
    console.log("signedIn:", signedIn);
    if (signedIn) {
      console.log("home.jsx로 들어감");
      router.replace("/home"); // 로그인 상태면 home 페이지로 이동
    } else {
      setIsLoading(false); // 로그인되지 않은 상태면 로딩 종료
    }
  };
  
  useEffect(() => {
    checkSignInStatus();
  }, []);

  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
