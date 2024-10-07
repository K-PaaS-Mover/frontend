import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import "nativewind";

import Status from "../../components/Status";
import CustomButton from "../../components/CustomButton";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 25px;
`;

const SignUpInterest = () => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());

  const handleButtonPress = (title) => {
    setSelectedButtons((prevSelectedButtons) => {
      const updatedSelectedButtons = new Set(prevSelectedButtons);
      if (updatedSelectedButtons.has(title)) {
        updatedSelectedButtons.delete(title); // 이미 선택된 버튼은 취소
      } else {
        updatedSelectedButtons.add(title); // 선택되지 않은 버튼은 선택
      }
      return updatedSelectedButtons;
    });
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text className="font-semibold text-[36px] text-center pt-[60px]">
            회원가입
          </Text>
          <Status left="68%" />
          {/* 제목 */}
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">
              관심 분야를 선택해 주세요!
            </Text>
          </View>
          {/* 관심 분야 선택 */}
          {/* 첫 줄 */}
          <View className="flex-1 justify-center items-center">
            <ButtonRow>
              {["관심1", "관심2", "관심3", "관심4"].map((title) => (
                <CustomButton
                  key={title}
                  title={title}
                  handlePress={() => handleButtonPress(title)}
                  containerStyles={`w-[73px] h-[40px] mt-[10px] mr-[2px] ml-[2px] border-[#50c3fa] border-[1px] rounded-[100px] ${
                    selectedButtons.has(title)
                      ? "bg-[#50c3fa]"
                      : "bg-transparent"
                  }`} // 선택된 버튼에 배경색 적용
                  textStyles={`text-center ${
                    selectedButtons.has(title) ? "text-white" : "text-[#50c3fa]"
                  }`} // 선택된 버튼에 텍스트 색상 적용
                />
              ))}
            </ButtonRow>
            <ButtonRow className="w-[65%]">
              {["관심5", "관심6", "관심7"].map((title) => (
                <CustomButton
                  key={title}
                  title={title}
                  handlePress={() => handleButtonPress(title)}
                  containerStyles={`w-[73px] h-[40px] ml-[2px] mr-[2px] border-[#50c3fa] border-[1px] rounded-[100px] ${
                    selectedButtons.has(title)
                      ? "bg-[#50c3fa]"
                      : "bg-transparent"
                  }`} // 선택된 버튼에 배경색 적용
                  textStyles={`text-center ${
                    selectedButtons.has(title) ? "text-white" : "text-[#50c3fa]"
                  }`} // 선택된 버튼에 텍스트 색상 적용
                />
              ))}
            </ButtonRow>
            <ButtonRow>
              {["관심8", "관심9", "관심10", "관심11"].map((title) => (
                <CustomButton
                  key={title}
                  title={title}
                  handlePress={() => handleButtonPress(title)}
                  containerStyles={`w-[73px] h-[40px] mr-[2px] ml-[2px] border-[#50c3fa] border-[1px] rounded-[100px] ${
                    selectedButtons.has(title)
                      ? "bg-[#50c3fa]"
                      : "bg-transparent"
                  }`} // 선택된 버튼에 배경색 적용
                  textStyles={`text-center ${
                    selectedButtons.has(title) ? "text-white" : "text-[#50c3fa]"
                  }`} // 선택된 버튼에 텍스트 색상 적용
                />
              ))}
            </ButtonRow>
          </View>
          {/* 다음 넘어가기 */}
          <View style={{ marginTop: 40, marginBottom: 50 }}>
            <CustomButton
              title="다음"
              handlePress={() => {
                // 다음 버튼 클릭 시 처리
                if (selectedButtons.size === 0) {
                  Alert.alert("Error", "하나 이상의 버튼을 선택해주세요.");
                } else {
                  router.push("/sign-up-finish"); // 선택된 버튼의 상태에 따라 라우팅
                }
              }}
              containerStyles={`w-[285px] h-[57px] mt-[165px] border-[#50c3fa] border-2 ${
                selectedButtons.size > 0 ? "bg-[#50c3fa]" : "bg-transparent"
              }`} // 버튼 상태에 따른 배경색 적용
              textStyles={`text-center ${
                selectedButtons.size > 0 ? "text-white" : "text-[#50c3fa]"
              }`} // 버튼 상태에 따른 텍스트 색상 적용
            />
            <Link
              href="/sign-in"
              className="text-[#C1C6CD] font-pregular text-center mt-[20px]"
            >
              로그인하기
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpInterest;
