import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Search from "../assets/icons/search.svg";

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
      className="w-[85%] h-[35px] px-4 
      border-[1px] border-solid
      border-[#50c3fa] focus:border-[#50c3fa]
      items-center flex-row space-x-4 mt-[30px]"
    >
      <TouchableOpacity>
        <Search width={24} height={24} />
      </TouchableOpacity>
      <TextInput
        className="text-base text-[#9A9A9A] flex-1 font-medium"
        value={value}
        placeholder="검색"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
    </View>
  );
};

export default SearchInput;
