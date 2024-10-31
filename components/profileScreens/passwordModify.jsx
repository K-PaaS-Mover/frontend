import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";

import Profile from "../../assets/icons/profile_modify.svg";
import Bell from "../../assets/icons/bell.svg";

import FormField from "../signComponents/FormField";
import { updatePassword } from "../../app/(api)/Members"; 

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const PasswordModify = () => {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
  });

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // 비밀번호 유효성 검증 함수
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{10,}$/;
    if (!passwordRegex.test(password)) {
      return "비밀번호는 영어 대소문자, 숫자, 특수문자를 포함한 10자 이상이어야 합니다.";
    }
    return "";
  };

  // 비밀번호 업데이트 요청 함수
  const handlePasswordUpdate = async () => {
    const passwordError = validatePassword(form.password);
    const newPasswordError = validatePassword(form.newPassword);

    if (passwordError || newPasswordError) {
      setPasswordErrorMessage(passwordError || newPasswordError);
      return;
    }

    // 현재 비밀번호와 새 비밀번호를 updatePassword 함수로 전달
    const result = await updatePassword(form.password, form.newPassword);
    if (result.success) {
      Alert.alert("성공", result.message);
      router.replace("/home");
    } else {
      Alert.alert("오류", result.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-4 mt-[-30px]">
        <ButtonRow>
          <TouchableOpacity activeOpacity={1} onPress={() => router.replace("/home")}>
            <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
          </TouchableOpacity>
          <Text className="font-pbold text-[20px] pr-[35px]">비밀번호 수정</Text>
          <Bell width={24} height={24} />
        </ButtonRow>
      </View>
      <View className="flex-1 justify-center items-center px-4 mt-[30px]">
        <FormField
          title="현재 비밀번호"
          value={form.password}
          handleChangeText={(text) => {
            setForm({ ...form, password: text });
            setPasswordErrorMessage(validatePassword(text));
          }}
          errorMessage={passwordErrorMessage}
          placeholder="현재 비밀번호를 입력하세요"
        />
        <FormField
          title="새 비밀번호"
          value={form.newPassword}
          handleChangeText={(text) => {
            setForm({ ...form, newPassword: text });
            setPasswordErrorMessage(validatePassword(text));
          }}
          errorMessage={passwordErrorMessage}
          otherStyles="mt-[30px]"
          placeholder="영어 대소문자, 숫자, 특수문자 포함 10자 이상 작성"
        />
        <TouchableOpacity
          onPress={handlePasswordUpdate}
          className="bg-blue-500 mt-5 py-3 px-5 rounded"
        >
          <Text className="text-white">비밀번호 수정하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordModify;
