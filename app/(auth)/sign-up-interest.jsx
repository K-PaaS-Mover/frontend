import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link } from "expo-router";
import "nativewind";

import Status from "../../components/signComponents/Status";
import CustomButton from "../../components/signComponents/CustomButton";
import { signUp } from "../(api)/signUp";
import { useUser } from "../UserContext"; // user context import

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const menuItems = [
  "돌봄",
  "어르신",
  "중장년",
  "장애인",
  "재활",
  "여성가족",
  "임산/출산",
  "영유아",
  "아동",
  "청소년",
  "청년",
  "자립",
  "일자리",
  "교육",
  "금융",
  "주택",
  "의료",
  "시설",
  "가족",
  "한부모",
  "다문화",
  "보훈",
];

const SignUpInterest = () => {
  const { username, password } = useUser(); // useUser 훅으로 사용자 정보 가져오기
  const [selectedButtons, setSelectedButtons] = useState(new Set());

  const handleButtonPress = (title) => {
    setSelectedButtons((prevSelectedButtons) => {
      const updatedSelectedButtons = new Set(prevSelectedButtons);
      updatedSelectedButtons.has(title)
        ? updatedSelectedButtons.delete(title)
        : updatedSelectedButtons.add(title);
      return updatedSelectedButtons;
    });
  };

  const handleSubmit = async (data) => {
    try {
      const response = await signUp(data);
      Alert.alert("성공", "관심 분야가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("오류", error.message || "관심 분야 저장 중 오류가 발생했습니다.");
    }
  };

  const handleSubmitClick = () => {
    if (selectedButtons.size === 0) {
      Alert.alert("오류", "관심 분야를 선택해 주세요.");
      return;
    }

    const selectedInterests = Array.from(selectedButtons);
    const data = {
      username,
      password,
      interests: selectedInterests,
    };

    handleSubmit(data);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text className="font-semibold text-[36px] text-center pt-[60px]">회원가입</Text>
          <Status left="68%" />
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">관심 분야를 선택해 주세요!</Text>
          </View>
          <View className="flex-1 justify-center items-center mt-4">
            {Array.from({ length: Math.ceil(menuItems.length / 4) }).map((_, rowIndex) => (
              <ButtonRow key={rowIndex}>
                {menuItems.slice(rowIndex * 4, rowIndex * 4 + 4).map((title) => (
                  <CustomButton
                    key={title}
                    title={title}
                    handlePress={() => handleButtonPress(title)}
                    containerStyles={`w-[73px] h-[40px] mr-[2px] ml-[2px] border-[#50c3fa] border-[1px] rounded-[100px] ${
                      selectedButtons.has(title) ? "bg-[#50c3fa]" : "bg-transparent"
                    }`}
                    textStyles={`text-center ${
                      selectedButtons.has(title) ? "text-white" : "text-[#50c3fa]"
                    }`}
                  />
                ))}
              </ButtonRow>
            ))}
          </View>
          <View>
            <CustomButton
              title="다음"
              handlePress={handleSubmitClick}
              containerStyles={`w-[285px] h-[57px] mt-[80px] border-[#50c3fa] border-2 ${
                selectedButtons.size > 0 ? "bg-[#50c3fa]" : "bg-transparent"
              }`}
              textStyles={`text-center ${
                selectedButtons.size > 0 ? "text-white" : "text-[#50c3fa]"
              }`}
            />
            <Link href="/sign-in" className="text-[#C1C6CD] font-pregular text-center mt-[20px]">
              로그인하기
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpInterest;
