import { TouchableOpacity, Text } from "react-native";
import React from "react";
import "nativewind"; // 추가: nativewind를 불러옵니다.

const CustomButton = ({ title, handlePress, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-[12px] justify-center items-center ${containerStyles}`}
    >
      <Text className={`font-psemibold text-[14px] ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
