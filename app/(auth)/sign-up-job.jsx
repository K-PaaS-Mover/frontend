import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import "nativewind";

import Status from "../../components/Status";
import CustomButton from "../../components/CustomButton";

const SignUpJob = () => {
  // 각 드롭다운의 선택 상태 관리
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [careerOptions, setCareerOptions] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [selectedSpecialNote, setSelectedSpecialNote] = useState(null);

  // 다음 버튼 활성화 여부
  const isNextButtonEnabled =
    selectedCompany &&
    selectedCareer &&
    selectedResidence &&
    selectedSpecialNote;

  // 직장 선택 시 경력 옵션 업데이트
  const handleCompanyChange = (company) => {
    setSelectedCompany(company);

    if (company === "학생") {
      setCareerOptions([
        { label: "대학생", value: "academic" },
        { label: "대학원생", value: "postgraduate" },
      ]);
    } else if (company === "취준생" || company === "직장인") {
      setCareerOptions([
        { label: "1-2년", value: "1_to_2" },
        { label: "3-4년", value: "3_to_4" },
        { label: "5년 이상", value: "more_than_5" },
      ]);
    } else {
      setCareerOptions([]);
    }
    setSelectedCareer(null); // 직장 변경 시 경력 선택 초기화
  };

  const handleSubmit = () => {
    if (!isNextButtonEnabled) {
      Alert.alert("Error", "항목을 선택해주세요.");
      return;
    }

    router.push("/sign-up-interest");
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
          <Status left="51%" />
          {/* 제목 */}
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">
              정보를 입력해주세요!
            </Text>
          </View>
          {/* 직장 드롭다운 메뉴 */}
          <View className="w-[85%] mt-[60px] border-b-[1px] border-[#50c3fa]">
            <Text
              className={`font-semibold text-[16px] mb-[8px] text-[#989DA3]`}
            >
              직장
            </Text>
            <RNPickerSelect
              onValueChange={handleCompanyChange}
              items={[
                { label: "학생", value: "학생" },
                { label: "취준생", value: "취준생" },
                { label: "직장인", value: "직장인" },
              ]}
              placeholder={{
                label: "직장을 선택해주세요!",
                value: null,
                color: "#989DA3",
              }}
              // useNativeAndroidPickerStyle={false}
              value={selectedCompany}
              style={{
                inputAndroid: {
                  marginLeft: -15,
                },
              }}
            />
          </View>
          {/* 경력 드롭다운 */}
          <View className="w-[85%] mt-[50px] border-b-[1px] border-[#50c3fa]">
            <Text
              className={`font-semibold text-[16px] mb-[8px] text-[#989DA3]`}
            >
              경력
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedCareer(value)}
              items={careerOptions}
              placeholder={{
                label: "경력을 선택해주세요!",
                value: null,
                color: "#989DA3",
              }}
              value={selectedCareer}
              style={{
                inputAndroid: {
                  marginLeft: -15,
                },
              }}
            />
          </View>
          {/* 거주지 드롭다운 메뉴 */}
          <View className="w-[85%] mt-[50px] border-b-[1px] border-[#50c3fa]">
            <Text
              className={`font-semibold text-[16px] mb-[8px] text-[#989DA3]`}
            >
              거주지
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedResidence(value)}
              items={[
                { label: "서초구", value: "서초구" },
                { label: "송파구", value: "송파구" },
                { label: "강남구", value: "강남구" },
              ]}
              placeholder={{
                label: "거주지를 선택해주세요!",
                value: null,
                color: "#989DA3",
              }}
              value={selectedResidence}
              style={{
                inputAndroid: {
                  marginLeft: -15,
                },
              }}
            />
          </View>
          {/* 특이사항 드롭다운 메뉴 */}
          <View className="w-[85%] mt-[50px] border-b-[1px] border-[#50c3fa]">
            <Text
              className={`font-semibold text-[16px] mb-[8px] text-[#989DA3]`}
            >
              특이사항
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedSpecialNote(value)}
              items={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
              ]}
              placeholder={{
                label: "특이사항을 선택해주세요!",
                value: null,
                color: "#989DA3",
              }}
              value={selectedSpecialNote}
              style={{
                inputAndroid: {
                  marginLeft: -15,
                },
              }}
            />
          </View>
          {/* 다음 넘어가기 */}
          <View style={{ marginTop: 40, marginBottom: 50 }}>
            <CustomButton
              title="다음"
              handlePress={handleSubmit} // 모든 값이 선택된 경우에만 다음 버튼 동작
              containerStyles={`w-[285px] h-[57px] mt-[165px] ${
                isNextButtonEnabled
                  ? "bg-[#50c3fa]"
                  : "border-[#50c3fa] border-2"
              }`} // 활성화 상태에 따라 배경색 변경
              textStyles={`text-center ${
                isNextButtonEnabled ? "text-white" : "text-[#50c3fa]"
              }`}
              disabled={!isNextButtonEnabled} // 모든 드롭다운이 선택되지 않으면 비활성화
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

export default SignUpJob;
