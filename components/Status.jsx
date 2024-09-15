import { View, Text, StyleSheet } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 85%;
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
`;

const Status = ({ markStyles }) => {
  return (
    <Container>
      <Line>
        <Mark className={`${markStyles}`} />
      </Line>
    </Container>
  );
};

export default Status;
