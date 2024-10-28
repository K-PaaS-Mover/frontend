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
import { signUp } from "../(api)/signUp.js"; // API 함수 임포트

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
    phoneNumber: "",
    verificationCode: "",
  });

  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [verificationCodeErrorMessage, setVerificationCodeErrorMessage] = useState("");
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

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10,11}$/; // 간단한 전화번호 형식
    if (!phoneRegex.test(phoneNumber)) {
      return "유효한 전화번호를 입력해 주세요.";
    }
    return "";
  };

  const validateForm = () => {
    const nameError = validateName(form.name);
    const birthDateError = validateBirthDate(form.birthDate);
    const phoneError = validatePhoneNumber(form.phoneNumber);

    setNicknameErrorMessage(nameError);
    setBirthDateErrorMessage(birthDateError);
    setPhoneNumberErrorMessage(phoneError);

    return !nameError && !birthDateError && !phoneError;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("오류", "입력한 정보를 확인해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        name: form.name,
        birthDate: form.birthDate,
        phoneNumber: form.phoneNumber,
        verificationCode: form.verificationCode,
      };
      const response = await signUp(data);
      Alert.alert("성공", "회원가입이 완료되었습니다!");
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
          {/* 이름 */}
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
                setPhoneNumberErrorMessage(validatePhoneNumber(text));
              }}
              errorMessage={phoneNumberErrorMessage}
              otherStyles="mt-[20px]"
              placeholder="전화번호를 입력해 주세요"
              keyboardType="phone-pad"
            />
            <CustomButton
              title="인증하기"
              handlePress={() => router.push("/")} // 실제 인증 로직 필요
              containerStyles={`w-[78px] h-[31px] border-2 border-[#DFE3E7] rounded-[10px]`}
              textStyles={`text-center text-[#515259] text-[12px] font-pregular`}
            />
          </ButtonRow>
          {/* 인증번호 */}
          <ButtonRow>
            <FormField
              title="인증번호"
              value={form.verificationCode}
              handleChangeText={(text) => {
                setForm({ ...form, verificationCode: text });
                // 검증 로직 추가 가능
              }}
              errorMessage={verificationCodeErrorMessage}
              otherStyles="mt-[20px]"
              placeholder="인증번호를 입력해 주세요"
              keyboardType="number-pad"
            />
            <CustomButton
              title="재전송"
              handlePress={() => router.push("/")} // 실제 재전송 로직 필요
              containerStyles={`w-[78px] h-[31px] border-2 border-[#DFE3E7] rounded-[10px]`}
              textStyles={`text-center text-[#515259] text-[12px] font-pregular`}
            />
          </ButtonRow>
          {/* 다음 넘어가기 */}
          <View style={{ marginTop: 100, marginBottom: 70 }}>
            <CustomButton
              title={isSubmitting ? <ActivityIndicator color="#fff" /> : "다음"}
              handlePress={handleSubmit}
              containerStyles={`w-[285px] h-[57px] border-2 mt-[30px] ${
                !nicknameErrorMessage &&
                !birthDateErrorMessage &&
                !phoneNumberErrorMessage &&
                form.name &&
                form.birthDate &&
                form.phoneNumber
                  ? "bg-[#50c3fa] border-[#50c3fa]"
                  : "border-[#50c3fa]"
              }`}
              textStyles={`text-center ${
                !nicknameErrorMessage &&
                !birthDateErrorMessage &&
                !phoneNumberErrorMessage &&
                form.name &&
                form.birthDate &&
                form.phoneNumber
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
