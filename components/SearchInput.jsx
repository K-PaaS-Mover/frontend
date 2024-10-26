import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

import Search from "../assets/icons/search.svg";

const SearchInput = forwardRef(
  (
    {
      title,
      value,
      placeholder,
      handleChangeText,
      otherStyles,
      onFocus, // 포커스 시 호출할 함수
      onBlur, // 포커스 해제 시 호출할 함수
      ...props
    },
    ref
  ) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    return (
      <View
        className="w-[355px] h-[35px] px-4 
      border-[1px] border-solid
      border-[#6d6d7a] focus:border-[#6d6d7a]
      items-center flex-row space-x-4 mt-[20px]"
      >
        <TouchableOpacity>
          <Search width={24} height={24} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          className="text-base flex-1 font-pregular text-[12px]"
          value={value}
          placeholder="검색"
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          onFocus={onFocus} // 포커스 시 호출
          onBlur={onBlur} // 포커스 해제 시 호출
        />
      </View>
    );
  }
);

export default SearchInput;
