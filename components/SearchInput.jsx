import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import search from "../assets/icons/search.png";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className="w-full h-[39.48px] px-4 
      bg-[#DFE3E7] rounded-[4px] focus:border-secondary 
      items-center flex-row space-x-4"
    >
      <TextInput
        className="text-base mt-0.5 text-[#9A9A9A] flex-1 font-medium"
        value={value}
        placeholder="검색"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity>
        <Image
          source={search}
          className="w-[24px] h-[24px]"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
