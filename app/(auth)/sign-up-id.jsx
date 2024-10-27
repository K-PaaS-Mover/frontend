import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import "nativewind"; // 추가: nativewind를 불러옵니다.

import Status from "../../components/components/Status";
import CustomButton from "../../components/components/CustomButton";
import FormField from "../../components/components/FormField";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 25px;
`;

const SignUpId = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [idSuccessMessage, setIdSuccessMessage] = useState("");

  const validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!idRegex.test(id)) {
      return "아이디는 영어와 숫자를 포함해 6자 이상이어야 합니다.";
    }
    return "";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{10,}$/;
    if (!passwordRegex.test(password)) {
      return "비밀번호는 영어 대소문자, 숫자, 특수문자를 포함한 10자 이상이어야 합니다.";
    }
    return "";
  };

  const validateForm = () => {
    const idError = validateId(form.id);
    const passwordError = validatePassword(form.password);
    setIdErrorMessage(idError);
    setPasswordErrorMessage(passwordError);

    return !idError && !passwordError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Error", "입력한 정보를 확인해 주세요.");
      return;
    }

    router.push("/sign-up-name");
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text className="font-semibold text-[36px] text-center pt-[60px]">회원가입</Text>
          <Status left="17%" />
          {/* 제목 */}
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">정보를 입력해주세요!</Text>
          </View>
          {/* 아이디와 비밀번호 */}
          <FormField
            title="아이디"
            value={form.id}
            handleChangeText={(text) => {
              setForm({ ...form, id: text });
              setIdErrorMessage(validateId(text)); // 아이디 입력 중 실시간 검증
              setIdSuccessMessage(!validateId(text) ? "아이디 작성 완료" : ""); // 성공 메시지 업데이트
            }}
            errorMessage={idErrorMessage}
            successMessage={idSuccessMessage}
            otherStyles="mt-[60px]"
            placeholder="영어, 숫자 포함 6자 이상 작성"
          />
          <FormField
            title="비밀번호"
            value={form.password}
            handleChangeText={(text) => {
              setForm({ ...form, password: text });
              setPasswordErrorMessage(validatePassword(text)); // 비밀번호 입력 중 실시간 검증
            }}
            errorMessage={passwordErrorMessage}
            otherStyles="mt-[30px]"
            placeholder="영어 대소문자, 숫자, 특수문자 포함 10자 이상 작성"
          />
          {/* 다음 넘어가기 */}
          <View>
            <CustomButton
              title="다음"
              handlePress={handleSubmit} // 다음 버튼 클릭 시 확인
              containerStyles={`w-[285px] h-[57px] border-2 mt-[165px] ${
                !idErrorMessage && !passwordErrorMessage && form.id && form.password
                  ? "bg-[#50c3fa] border-[#50c3fa]"
                  : "border-[#50c3fa]"
              }`} // 동의 상태에 따라 배경색 변경
              textStyles={`text-center ${
                !idErrorMessage && !passwordErrorMessage && form.id && form.password
                  ? "text-white"
                  : "text-[#50c3fa]"
              }`}
            />
            <Link
              href="/sign-in"
              className="text-[#C1C6CD] font-pregular text-center
              mt-[20px]
              "
            >
              로그인하기
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpId;
