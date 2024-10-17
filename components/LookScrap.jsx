import {
  View,
  Text,
  FlatList,
  RefreshControl,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Bell from "../assets/icons/bell.svg";
import Views from "../assets/icons/views.svg";
import Scrap from "../assets/icons/scrap.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const LookScrap = () => {
  return (
    // 스크랩된 정책 화면
    <View></View>
  );
};

export default LookScrap;
