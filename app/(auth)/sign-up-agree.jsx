import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import "nativewind"; // 추가: nativewind를 불러옵니다.

import BoxCompleted from "../../assets/icons/check_box_outline.svg";
import BoxUncompleted from "../../assets/icons/check_box.svg";
import CheckCompleted from "../../assets/icons/check.svg";
import CheckUncompleted from "../../assets/icons/check_outline.svg";

import Status from "../../components/Status";
import IconButton from "../../components/IconButton";
import { images } from "../images";
import CustomButton from "../../components/CustomButton";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 25px;
`;

const SignUpAgree = () => {
  const [isAgreed, setIsAgreed] = useState(false); // 개인정보 수집 동의 상태
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false); // 마케팅 수신 동의 상태
  const [isAllAgreed, setIsAllAgreed] = useState(false); // 모두 동의 상태

  // 모두 동의 버튼 눌렀을 때 처리
  const handleAllAgreePress = () => {
    const newAllAgreed = !isAllAgreed;
    setIsAllAgreed(newAllAgreed);
    setIsAgreed(newAllAgreed); // 모두 동의 시 개인정보 수집 동의
    setIsMarketingAgreed(newAllAgreed); // 모두 동의 시 마케팅 수신 동의
  };

  // 개인정보 수집 동의 버튼 눌렀을 때 처리
  const handleAgreePress = () => {
    const newAgreeState = !isAgreed;
    setIsAgreed(newAgreeState);
    // setIsAllAgreed(isAllAgreed);
  };

  // 마케팅 수신 동의 버튼 눌렀을 때 처리
  const handleMarketingAgreePress = () => {
    const newMarketingAgreeState = !isMarketingAgreed;
    setIsMarketingAgreed(newMarketingAgreeState);
    if (newMarketingAgreeState) {
      // 마케팅 동의했을 때만 "모두 동의" 상태를 검토
      if (isAgreed) {
        setIsAllAgreed(true); // 개인정보 수집 동의와 마케팅 동의가 모두 되면 "모두 동의" 상태
      }
    } else {
      setIsAllAgreed(false); // 마케팅 동의 해제 시 "모두 동의" 해제
    }
  };

  const handleNextPress = () => {
    if (!isAgreed) {
      Alert.alert("알림", "개인정보 수집 동의에 체크해주세요.");
    } else {
      router.push("/sign-up-id"); // 동의했을 때만 다음 페이지로 이동
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="font-semibold text-[36px] text-center pt-[60px] ">
            회원가입
          </Text>
          <Status markStyles="left-0" />
          {/* 제목 */}
          <View className="w-[85%]">
            <Text className="font-semibold text-[16px] pt-[30px]">
              [제목] 서비스 이용약관에
            </Text>
            <Text className="font-semibold text-[16px] pt-[30px] mt-[-25px]">
              동의해주세요.
            </Text>
          </View>
          {/* 개인 정보 수집 */}
          <View className="w-[85%]">
            <ButtonRow className="mt-[60px] w-[110px]">
              <TouchableOpacity onPress={handleAllAgreePress}>
                {!isAgreed ? (
                  <BoxCompleted width={24} height={24} />
                ) : (
                  <BoxUncompleted width={24} height={24} />
                )}
              </TouchableOpacity>
              {/* <IconButton
                type={isAgreed ? BoxCompleted : images.boxUncompleted}
                onPress={handleAllAgreePress}
              /> */}
              <Text className="font-semibold text-[14px] text-[#515259]">
                모두 동의
              </Text>
            </ButtonRow>
            <View className="w-[100%] h-[1px] bg-[#DFE3E7] mt-[10px]" />
            <ButtonRow className="mt-[30px] w-[150px]">
              {/* <IconButton
                type={isAgreed ? images.completed : images.uncompleted} // 동의 여부에 따른 이미지 변화
                onPress={handleAgreePress} // 누를 때 상태 변경
              /> */}
              <TouchableOpacity onPress={handleAllAgreePress}>
                {!isAgreed ? (
                  <CheckUncompleted width={24} height={24} />
                ) : (
                  <CheckCompleted width={24} height={24} />
                )}
              </TouchableOpacity>
              <Text className="font-semibold text-[14px] text-[#515259]">
                개인정보 수집 동의
              </Text>
            </ButtonRow>
            <ButtonRow className="mt-[15px] w-[150px]">
              {/* <IconButton
                type={isMarketingAgreed ? images.completed : images.uncompleted} // 마케팅 수신 동의 이미지 변경
                onPress={handleMarketingAgreePress} // 마케팅 동의 버튼 클릭 시
              /> */}
              <TouchableOpacity
                onPress={handleMarketingAgreePress}
                className="mr-[15px]"
              >
                {!isMarketingAgreed ? (
                  <CheckUncompleted width={24} height={24} />
                ) : (
                  <CheckCompleted width={24} height={24} />
                )}
              </TouchableOpacity>
              <Text className="font-semibold text-[14px] text-[#515259]">
                (선택) 마케팅 수신동의
              </Text>
            </ButtonRow>
          </View>
          {/* 다음 넘어가기 */}
          <View>
            <CustomButton
              title="다음"
              handlePress={handleNextPress} // 다음 버튼 클릭 시 확인
              containerStyles={`w-[285px] h-[57px] border-2 mt-[200px] ${
                isAgreed ? "bg-[#50c3fa] border-[#50c3fa]" : "border-[#50c3fa]"
              }`} // 동의 상태에 따라 배경색 변경
              textStyles={`text-center ${
                isAgreed ? "text-white" : "text-[#50c3fa]"
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

export default SignUpAgree;
