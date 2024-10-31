// SearchInputContainer.js
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { TextInput } from "react-native";
import PropTypes from 'prop-types';

const SearchInputContainer = forwardRef(
  (
    {
      value,
      handleChangeText,
      onFocus,
      onBlur,
      onSubmitEditing,
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
      <TextInput
        ref={inputRef}
        className="text-base flex-1 font-pregular text-[12px]"
        value={value}
        placeholder="검색"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
    );
  }
);

SearchInputContainer.propTypes = {
  value: PropTypes.string.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmitEditing: PropTypes.func.isRequired,
};

export default SearchInputContainer;
