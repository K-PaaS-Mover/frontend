import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import "nativewind";

import Status from "../../components/signComponents/Status";
import CustomButton from "../../components/signComponents/CustomButton";

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
  "자활",
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

const SignUpInterest = ({ form, handleSubmit }) => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());

  const handleButtonPress = (title) => {
    setSelectedButtons((prevSelectedButtons) => {
      const updatedSelectedButtons = new Set(prevSelectedButtons);
      if (updatedSelectedButtons.has(title)) {
        updatedSelectedButtons.delete(title);
      } else {
        updatedSelectedButtons.add(title);
      }
      return updatedSelectedButtons;
    });
  };

  const handleSubmitClick = () => {
    if (selectedButtons.size === 0) {
      Alert.alert("오류", "관심 분야를 선택해 주세요.");
      return;
    }

    const selectedInterests = Array.from(selectedButtons);
    // 서버에 보낼 데이터 생성
    const dataToSend = {
      username: form.id, // 아이디
      password: form.password, // 비밀번호
      interests: selectedInterests, // 선택한 관심 분야
    };

    console.log(form); // 이 줄을 추가해 form 객체의 상태를 확인
    // handleSubmit 함수를 호출하면서 데이터를 보냄
    handleSubmit(dataToSend);
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
          <View className="flex-1 justify-center items-center">
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
              handlePress={handleSubmitClick} // 다음 버튼 클릭 시 처리
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
