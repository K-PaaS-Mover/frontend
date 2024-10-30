// sign-up-id
import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import "nativewind";

import Status from "../../components/signComponents/Status";
import CustomButton from "../../components/signComponents/CustomButton";
import FormField from "../../components/signComponents/FormField";
import { checkIdDuplicate } from "../(api)/signUp.js"; // API 함수 임포트
import { useUser } from "../UserContext.jsx"; // UserContext 임포트

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 25px;
`;

const SignUpId = () => {
  const { setUsername, setPassword } = useUser(); // UserContext에서 상태 가져오기

  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const [idErrorMessage, setIdErrorMessage] = useState(""); // 아이디 오류 메시지 상태
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(""); // 비밀번호 오류 메시지 상태
  const [idSuccessMessage, setIdSuccessMessage] = useState(""); // 아이디 성공 메시지 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 상태 추가
  const [isIdAvailable, setIsIdAvailable] = useState(null); // 아이디 사용 가능 여부 상태

  // 검증 함수
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

  // SignUpId 컴포넌트
  const handleSubmit = async () => {
    if (!validateForm() || !isIdAvailable) {
      Alert.alert("오류", "입력한 정보를 확인해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        username: form.id, // username에 id 값을 할당
      };

      // UserContext에 username과 password 저장
      setUsername(form.id); // 여기서 설정
      setPassword(form.password);

      console.log("서버로 보낼 데이터:", data);

      // const response = await signUp(data); // 비밀번호를 보내지 않도록 수정
      Alert.alert("성공", "아이디 등록이 완료되었습니다!"); // 메시지 수정
      router.push("/sign-up-name");
    } catch (error) {
      Alert.alert("회원가입 실패", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckIdDuplicate = async () => {
    if (form.id.trim() === "") {
      Alert.alert("아이디를 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true); // 로딩 상태 표시
      const isDuplicate = await checkIdDuplicate(form.id);

      if (isDuplicate) {
        setIsIdAvailable(false);
        Alert.alert("중복 오류", "이미 사용 중인 아이디입니다.");
      } else {
        setIsIdAvailable(true);
        Alert.alert("확인", "사용 가능한 아이디입니다.");
        setIdSuccessMessage("사용 가능한 아이디입니다.");
        setIdErrorMessage("");
      }
    } catch (error) {
      Alert.alert("오류", "아이디 중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false); // 로딩 상태 해제
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text className="font-semibold text-[36px] text-center pt-[60px]">회원가입</Text>
          <Status left="17%" />
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">정보를 입력해주세요!</Text>
          </View>
          <CustomButton
            title="아이디 중복 확인"
            handlePress={handleCheckIdDuplicate} // 중복 확인 버튼 클릭 시 확인
            containerStyles={`w-[120px] h-[30px] border-2 absolute right-[20px] top-[300px] z-50 ${
              isIdAvailable === true ? "bg-green-500 border-green-500" : "border-[#C1C6CD]"
            }`}
            textStyles={`text-center ${isIdAvailable === true ? "text-white" : "text-[#C1C6CD]"}`}
          />
          <FormField
            title="아이디"
            value={form.id}
            handleChangeText={(text) => {
              setForm({ ...form, id: text });
              const errorMessage = validateId(text); // 실시간 검증
              setIdErrorMessage(errorMessage);
              setIdSuccessMessage(!errorMessage ? "아이디 작성 완료" : ""); // 성공 메시지 업데이트
              setIsIdAvailable(null); // 중복 확인 초기화
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
              setPasswordErrorMessage(validatePassword(text)); // 비밀번호 실시간 검증
            }}
            errorMessage={passwordErrorMessage}
            otherStyles="mt-[30px]"
            placeholder="영어 대소문자, 숫자, 특수문자 포함 10자 이상 작성"
            secureTextEntry // 비밀번호 숨김 처리
          />
          <View>
            <CustomButton
              title={isSubmitting ? "처리 중..." : "다음"}
              handlePress={handleSubmit} // 다음 버튼 클릭 시 확인
              containerStyles={`w-[285px] h-[57px] border-2 mt-[165px] ${
                !idErrorMessage && form.id && isIdAvailable
                  ? "bg-[#50c3fa] border-[#50c3fa]"
                  : "border-[#50c3fa]"
              }`}
              textStyles={`text-center ${
                !idErrorMessage && form.id && isIdAvailable ? "text-white" : "text-[#50c3fa]"
              }`}
              disabled={isSubmitting} // 버튼 비활성화
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpId;
