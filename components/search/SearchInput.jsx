// SearchInput.js
import React, { useRef, forwardRef, useImperativeHandle, memo } from "react";
import { View, TextInput, TouchableOpacity, Keyboard } from "react-native";
import Search from "../../assets/icons/search.svg";
import PropTypes from 'prop-types'; // PropTypes 추가 (선택 사항)

const SearchInput = forwardRef(
  (
    {
      value,
      handleChangeText,
      onSearch, // 검색을 실행하는 함수
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
    }), []);

    const handleSearchSubmit = () => {
      if (value.trim() === "") return; // 빈 검색어는 무시
      onSearch(value); // 검색 실행
      Keyboard.dismiss(); // 키보드 닫기
    };

    return (
      <View
        className="w-[355px] h-[35px] px-4 
          border-[1px] border-solid
          border-[#6d6d7a] focus:border-[#6d6d7a]
          items-center flex-row space-x-4 mt-[20px]"
      >
        <TouchableOpacity onPress={handleSearchSubmit}>
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
          // onSubmitEditing={handleSearchSubmit} // 엔터 시 검색 실행
          {...props}
        />
      </View>
    );
  }
);

// PropTypes 설정 (선택 사항)
SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default memo(SearchInput);
