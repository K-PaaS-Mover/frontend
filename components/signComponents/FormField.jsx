import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";

import Visible from "../../assets/icons/visibility.svg";
import UnVisible from "../../assets/icons/visibility_off.svg";

const Container = styled.View`
  width: 85%;
  margin-top: 60px;
`;
const InputContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => (props.isFocused ? "#515259" : "#50C3FA")};
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const InputLabel = styled.Text`
  font-size: 16px;
  color: ${(props) => (props.isFocused ? "#515259" : "#989DA3")};
  margin-bottom: 15px;
`;
const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  errorMessage,
  successMessage,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container style={otherStyles}>
      <InputLabel className="font-psemibold" isFocused={isFocused}>
        {title}
      </InputLabel>
      <InputContainer>
        <TextInput
          style={{ flex: 1, fontSize: 14, marginTop: 0 }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#989DA3"
          onChangeText={(text) => handleChangeText(text)}
          secureTextEntry={title === "비밀번호" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {title === "비밀번호" ||
          (title === "비밀번호 수정" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Visible width={24} height={24} />
              ) : (
                <UnVisible width={24} height={24} />
              )}
            </TouchableOpacity>
          ))}
      </InputContainer>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Container>
  );
};

export default FormField;
