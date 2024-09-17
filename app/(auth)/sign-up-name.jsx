import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import "nativewind"; // 추가: nativewind를 불러옵니다.

import Status from "../../components/Status";
import IconButton from "../../components/IconButton";
import { images } from "../images";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: end;
  align-items: flex-end;
  width: 85%;
  /* margin-top: 25px; */
  padding-right: 33px; /* 오른쪽 패딩 추가 */
`;

const SignUpName = () => {
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    phoneNumber: "",
    verificationCode: "",
  });

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [verificationCodeErrorMessage, setVerificationCodeErrorMessage] =
    useState("");

  const validateName = (name) => {
    if (name.trim().length === 0) {
      return "이름을 입력해 주세요.";
    }
    return "";
  };

  const validateBirthDate = (birthDate) => {
    const birthDateRegex = /^\d{2}\d{2}\d{2}$/;
    if (!birthDateRegex.test(birthDate)) {
      return "생년월일은 YYMMDD 형식이어야 합니다.";
    }
    return "";
  };

  const validateForm = () => {
    const nameError = validateName(form.name);
    const birthDateError = validateBirthDate(form.birthDate);

    setNameErrorMessage(nameError);
    setBirthDateErrorMessage(birthDateError);

    return !nameError && !birthDateError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Error", "입력한 정보를 확인해 주세요.");
      return;
    }

    router.push("/sign-up-job");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text className="font-semibold text-[36px] text-center pt-[60px]">
            회원가입
          </Text>
          <Status left="34%" />
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">
              정보를 입력해주세요!
            </Text>
          </View>
          {/* 이름 */}
          <FormField
            title="이름"
            value={form.name}
            handleChangeText={(text) => {
              setForm({ ...form, name: text });
              setNameErrorMessage(validateName(text));
            }}
            errorMessage={nameErrorMessage}
            otherStyles="mt-[20px]"
            placeholder="이름을 입력해 주세요"
          />
          {/* 생년월일 */}
          <FormField
            title="생년월일"
            value={form.birthDate}
            handleChangeText={(text) => {
              setForm({ ...form, birthDate: text });
              setBirthDateErrorMessage(validateBirthDate(text));
            }}
            errorMessage={birthDateErrorMessage}
            otherStyles="mt-[20px]"
            placeholder="YYMMDD 형식으로 입력"
          />
          {/* 전화번호 */}
          <ButtonRow style={{ marginBottom: -70 }}>
            <FormField
              title="번호"
              value={form.phoneNumber}
              handleChangeText={(text) => {
                setForm({ ...form, phoneNumber: text });
              }}
              otherStyles="mt-[20px]"
              placeholder="전화번호를 입력해 주세요"
            />
            <CustomButton
              title="인증하기"
              handlePress={() => router.push("/")} // 다음 버튼 클릭 시 확인
              containerStyles={`w-[78px] h-[31px] border-2  border-[#DFE3E7] rounded-[10px]`} // 동의 상태에 따라 배경색 변경
              textStyles={`text-center text-[#515259] text-[12px] font-pregular`}
            />
          </ButtonRow>
          {/* 인증번호 */}
          <ButtonRow>
            <FormField
              handleChangeText={(text) => {}}
              placeholder="인증번호를 입력해 주세요"
            />
            <CustomButton
              title="재전송"
              handlePress={() => router.push("/")} // 다음 버튼 클릭 시 확인
              containerStyles={`w-[78px] h-[31px] border-2  border-[#DFE3E7] rounded-[10px]`} // 동의 상태에 따라 배경색 변경
              textStyles={`text-center text-[#515259] text-[12px] font-pregular`}
            />
          </ButtonRow>
          {/* 다음 넘어가기 */}
          <View style={{ marginTop: 100, marginBottom: 70 }}>
            <CustomButton
              title="다음"
              handlePress={handleSubmit}
              containerStyles={`w-[285px] h-[57px] border-2 mt-[30px] ${
                !nameErrorMessage &&
                !birthDateErrorMessage &&
                !phoneNumberErrorMessage &&
                form.name &&
                form.birthDate &&
                form.phoneNumber
                  ? "bg-[#50c3fa] border-[#50c3fa]"
                  : "border-[#50c3fa]"
              }`}
              textStyles={`text-center ${
                !nameErrorMessage &&
                !birthDateErrorMessage &&
                !phoneNumberErrorMessage &&
                form.name &&
                form.birthDate &&
                form.phoneNumber
                  ? "text-white"
                  : "text-[#50c3fa]"
              }`}
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

export default SignUpName;
