import { View, Text, StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "10px")};
`;
const Line = styled.View`
  width: 100%;
  height: 2.5px;
  background-color: #dfe3e7;
  margin-top: 40px;
`;
const Mark = styled.View`
  width: 15%;
  height: 2.5px;
  background-color: #50c3fa;
  position: absolute;
  left: ${({ left }) => (left ? left : "0")}; /* left 속성을 props로 설정 */
`;

const Status = ({ left, marginTop }) => {
  return (
    <Container marginTop={marginTop}>
      <Line>
        <Mark left={left} />
      </Line>
    </Container>
  );
};

export default Status;
