import { View, Text, ScrollView, Alert, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import "nativewind";

import Welfare1 from "../../assets/images/welfare1.svg";
import Welfare2 from "../../assets/images/welfare2.svg";
import Welfare3 from "../../assets/images/welfare3.svg";
import Welfare4 from "../../assets/images/welfare4.svg";
import Welfare5 from "../../assets/images/welfare5.svg";

import Status from "../../components/components/Status";
import CustomButton from "../../components/components/CustomButton";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 25px;
`;

const SignUpFinish = () => {
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
          <Status left="85%" marginTop="80px" />
          {/* 제목 */}
          <View className="w-[85%] pt-[30px]">
            <Text className="font-pblack text-[18px] pt-[30px] text-center">
              회원가입을 완료하였습니다!
            </Text>
            <Text className="font-pblack text-[18px] pt-[5px] text-center">
              다양한 정책을 만나보세요.
            </Text>
          </View>
          <View className="flex-1 justify-center items-center">
            <ButtonRow>
              <View className="mt-[-30px]">
                <Welfare1 />
              </View>
              <View className="mt-[90px]">
                <Welfare2 />
              </View>
              <View>
                <Welfare3 />
              </View>
            </ButtonRow>
            <ButtonRow className="mt-[-50px]">
              <View className="mt-[20px] ml-[10px]">
                <Welfare4 />
              </View>
              <View className="mt-[50px] mr-[10px]">
                <Welfare5 />
              </View>
            </ButtonRow>
          </View>
          {/* 다음 넘어가기 */}
          <View style={{ marginTop: -100 }}>
            <CustomButton
              title="시작하기"
              handlePress={() => {
                router.replace("/home");
              }}
              containerStyles={`w-[285px] h-[57px] mt-[165px] bg-[#50c3fa]`}
              textStyles={`text-center text-[#fff]`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpFinish;
