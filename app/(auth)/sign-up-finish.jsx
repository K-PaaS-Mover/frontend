import { View, Text, ScrollView, Alert, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Link, router } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import "nativewind";

import { images } from "../images";
import Status from "../../components/Status";
import CustomButton from "../../components/CustomButton";
import { Button } from "react-native-web";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 25px;
`;

const SignUpFinish = () => {
  return (
    <SafeAreaView>
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
              <Image
                source={images.welfare1}
                resizeMode="contain"
                className="w-[120px] mt-[-30px]"
              />
              <Image
                source={images.welfare2}
                resizeMode="contain"
                className="w-[120px] mt-[90px]"
              />
              <Image
                source={images.welfare3}
                resizeMode="contain"
                className="w-[120px]"
              />
            </ButtonRow>
            <ButtonRow className="mt-[-50px]">
              <Image
                source={images.welfare4}
                resizeMode="contain"
                className="w-[120px] mt-[20px] ml-[10px]"
              />
              <Image
                source={images.welfare5}
                resizeMode="contain"
                className="w-[120px] mt-[50px] mr-[10px]"
              />
            </ButtonRow>
          </View>
          {/* 다음 넘어가기 */}
          <View style={{ marginTop: -100 }}>
            <CustomButton
              title="시작하기"
              handlePress={() => {
                router.push("/");
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
