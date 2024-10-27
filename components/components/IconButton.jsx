import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

const IconButton = ({ type, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon source={type} style={{ marginRight: 40 }} />
    </TouchableOpacity>
  );
};
