import { View, Text, BackHandler, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

import ArrowLeft from "../../assets/icons/arrow_left.svg";
import ArrowRight from "../../assets/icons/arrow_right.svg";
import EditCalendar from "../../assets/icons/edit_calendar.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const CalendarFrame = () => {
  const [viewScrapped, setViewScrapped] = useState(false); // 스크랩 화면 보기 상태
  const [selected, setSelected] = useState("");
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [calendarKey, setCalendarKey] = useState(0); // Calendar의 리렌더링을 위한 key
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // 리프레시 처리 로직
    setRefreshing(false);
  };

  // 뒤로 가기 버튼 처리
  useEffect(() => {
    const backAction = () => {
      if (viewScrapped) {
        setViewScrapped(false); // 스크랩 보기에서 프로필 화면으로 전환
        return true; // 기본 뒤로 가기 동작 방지
      }
      return false; // 기본 동작 수행 (앱 종료 또는 이전 화면 이동)
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // 컴포넌트 언마운트 시 핸들러 제거
  }, [viewScrapped]);

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    const previousMonth = moment(currentDate).subtract(1, "months").format("YYYY-MM-DD");
    setCurrentDate(previousMonth);
    setCalendarKey(calendarKey + 1); // 강제 리렌더링 트리거
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months").format("YYYY-MM-DD");
    setCurrentDate(nextMonth);
    setCalendarKey(calendarKey + 1); // 강제 리렌더링 트리거
  };

  // 홈으로 이동 시 현재 날짜로 달력 초기화
  const goToHome = () => {
    setCurrentDate(moment().format("YYYY-MM-DD")); // 현재 날짜로 초기화
    setCalendarKey(calendarKey + 1); // 강제 리렌더링 트리거
    router.replace("/home"); // 홈으로 이동
  };

  const renderHeader = () => {
    return (
      <View className="w-[325px] mt-[10px] flex-start items-start">
        <Text className="font-pmedium text-[#474A9C] text-[18px]">
          {moment(currentDate).format("MMMM YYYY")}
        </Text>
        <Text> </Text>
      </View>
    );
  };

  return (
    <View className="h-[100px] justify-center items-center mt-[-30px] mb-[50px]">
      <View className="w-[350px] flex-1 items-center px-4">
        <ButtonRow className="justify-center">
          <TouchableOpacity
            activeOpacity={1}
            onPress={goToHome} // MATE 버튼을 누르면 홈으로 이동 및 달력 초기화
          >
            <Text className="font-pblack text-2xl text-white">Mate</Text>
          </TouchableOpacity>
          <ButtonRow className="mt-0 justify-center ml-[-30px]">
            <TouchableOpacity activeOpacity={1} onPress={goToPreviousMonth}>
              <ArrowLeft width={24} height={24} />
            </TouchableOpacity>
            <Text className="font-pbold text-[20px] text-white mx-[10px]">
              {moment(currentDate).format("YYYY.MM")} {/* 동적으로 현재 달 표시 */}
            </Text>
            <TouchableOpacity activeOpacity={1} onPress={goToNextMonth}>
              <ArrowRight width={24} height={24} />
            </TouchableOpacity>
          </ButtonRow>
          <EditCalendar width={24} height={24} />
        </ButtonRow>
        <ButtonRow className="mt-[40px] justify-between w-[387px]">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
            <View key={index} className="flex-1 items-center">
              <Text className="font-pregular text-[12px] text-white">{day}</Text>
            </View>
          ))}
        </ButtonRow>
      </View>
    </View>
  );
};

export default CalendarFrame;
