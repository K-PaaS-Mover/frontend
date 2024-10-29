import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";

import Profile from "../../assets/icons/profile_modify.svg";
import Bell from "../../assets/icons/bell.svg";

import FormField from "../signComponents/FormField";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const PasswordModify = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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
          title="비밀번호 수정"
          value={form.password}
          handleChangeText={(text) => {
            setForm({ ...form, password: text });
            setPasswordErrorMessage(validatePassword(text)); // 비밀번호 입력 중 실시간 검증
          }}
          errorMessage={passwordErrorMessage}
          otherStyles="mt-[30px]"
          placeholder="영어 대소문자, 숫자, 특수문자 포함 10자 이상 작성"
        />
      </View>
    </SafeAreaView>
  );
};

export default PasswordModify;
