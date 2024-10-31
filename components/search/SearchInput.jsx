// SearchInput.js
import React, { useRef, forwardRef, useImperativeHandle, memo } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import Search from "../../assets/icons/search.svg";
import PropTypes from 'prop-types';
import SearchInputContainer from "./SearchInputContainer";

const SearchInput = forwardRef(
  (
    {
      value,
      handleChangeText,
      onSearch,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef(null);

    const handleSearchSubmit = () => {
      const trimmedValue = value.trim();
      if (trimmedValue === "") return; // 빈 검색어는 무시
      onSearch(trimmedValue); // 공백 제거 후 검색 실행
      console.log("trim");
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }), []);

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
        <SearchInputContainer
          ref={inputRef}
          value={value}
          handleChangeText={handleChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={handleSearchSubmit}
          {...props}
        />
      </View>
    );
  }
);

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default memo(SearchInput);
