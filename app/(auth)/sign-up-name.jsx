// SignUpName.js
import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import "nativewind";

import Status from "../../components/signComponents/Status";
import CustomButton from "../../components/signComponents/CustomButton";
import FormField from "../../components/signComponents/FormField";
import { signUp } from "../(api)/signUp.js";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: end;
  align-items: flex-end;
  width: 85%;
  padding-right: 33px;
`;

const SignUpName = () => {
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
  });

  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name) => {
    if (name.trim().length === 0) {
      return "이름을 입력해 주세요.";
    }
    return "";
  };

  const validateBirthDate = (birthDate) => {
    const birthDateRegex = /^\d{6}$/; // YYMMDD 형식
    if (!birthDateRegex.test(birthDate)) {
      return "생년월일은 YYMMDD 형식이어야 합니다.";
    }
    return "";
  };

  const formatBirthDate = (birthDate) => {
    const yearPrefix = parseInt(birthDate.slice(0, 2)) <= 22 ? "20" : "19";
    const year = birthDate.slice(0, 2);
    const month = birthDate.slice(2, 4);
    const day = birthDate.slice(4, 6);
    return `${yearPrefix}${year}-${month}-${day}`; // 포맷 예: 2000-01-01 또는 1995-08-12
  };

  const validateForm = () => {
    const nameError = validateName(form.name);
    const birthDateError = validateBirthDate(form.birthDate);

    setNicknameErrorMessage(nameError);
    setBirthDateErrorMessage(birthDateError);

    return !nameError && !birthDateError;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("오류", "입력한 정보를 확인해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      router.push("/sign-up-job");
    } catch (error) {
      Alert.alert("회원가입 실패", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text className="font-semibold text-[36px] text-center pt-[60px]">회원가입</Text>
          <Status left="34%" />
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">정보를 입력해 주세요!</Text>
          </View>
          <FormField
            title="이름"
            value={form.name}
            handleChangeText={(text) => {
              setForm({ ...form, name: text });
              setNicknameErrorMessage(validateName(text));
            }}
            errorMessage={nicknameErrorMessage}
            otherStyles="mt-[20px]"
            placeholder="이름을 입력해 주세요"
          />
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
          <View style={{ marginTop: 100, marginBottom: 70 }}>
            <CustomButton
              title={isSubmitting ? <ActivityIndicator color="#fff" /> : "다음"}
              handlePress={handleSubmit}
              containerStyles={`w-[285px] h-[57px] border-2 mt-[30px] ${
                !nicknameErrorMessage && !birthDateErrorMessage && form.name && form.birthDate
                  ? "bg-[#50c3fa] border-[#50c3fa]"
                  : "border-[#50c3fa]"
              }`}
              textStyles={`text-center ${
                !nicknameErrorMessage && !birthDateErrorMessage && form.name && form.birthDate
                  ? "text-white"
                  : "text-[#50c3fa]"
              }`}
              disabled={isSubmitting}
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

export default SignUpName;
