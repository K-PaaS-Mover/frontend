import { View, Text, BackHandler, FlatList } from "react-native";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";

import HomeFrame from "../../components/policyFrame/HomeFrame";

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

const Schedule = () => {
  const [viewScrapped, setViewScrapped] = useState(false);
  const [selected, setSelected] = useState(""); // 초기 상태에서 빈 문자열
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [homeFrameData, setHomeFrameData] = useState(null);
  const flatListRef = useRef(null);
  const modalRef = useRef(null); // Modalize 참조

  // 뒤로 가기 버튼 처리
  useEffect(() => {
    const backAction = () => {
      if (viewScrapped) {
        setViewScrapped(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [viewScrapped]);

  // 이전 달로 이동
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, "months").format("YYYY-MM-DD"));
  }, []);

  // 다음 달로 이동
  const goToNextMonth = useCallback(() => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, "months").format("YYYY-MM-DD"));
  }, []);

  // 홈으로 이동 시 현재 날짜로 달력 초기화
  const goToHome = useCallback(() => {
    setCurrentDate(moment().format("YYYY-MM-DD"));
    router.replace("/home");
  }, []);

  // 현재 달과 다음 몇 개의 달을 표시하기 위한 데이터 생성
  const generateMonths = useCallback((current) => {
    const months = [];
    const totalMonthsToDisplay = 3;
    for (let i = 0; i < totalMonthsToDisplay; i++) {
      months.push(moment(current).add(i, "months").format("YYYY-MM-DD"));
    }
    return months;
  }, []);

  // 주황색 점을 표시할 날짜들
  const markedDatesData = {
    "2024-10-15": { dots: [{ key: "event", color: "#FFC830" }] },
    "2024-10-20": { dots: [{ key: "event", color: "#FFC830" }] },
  };

  // 주황색 점에 해당하는 데이터
  const eventData = {
    "2024-10-15": {
      title: "이벤트 1",
      company: "회사 1",
      period: "2024-10-01 ~ 2024-10-15",
      category: "카테고리 A",
      views: 120,
      scrap: 30,
    },
    "2024-10-20": {
      title: "이벤트 2",
      company: "회사 2",
      period: "2024-10-16 ~ 2024-10-20",
      category: "카테고리 B",
      views: 95,
      scrap: 15,
    },
  };

  // markedDates를 useMemo로 캐싱하여 성능 최적화
  const markedDates = useMemo(() => {
    const updatedMarkedDates = { ...markedDatesData };

    if (selected) {
      updatedMarkedDates[selected] = {
        ...updatedMarkedDates[selected],
        selected: true,
        selectedColor: "#50C3FA",
        selectedTextColor: "#FFFFFF",
        dots: [...(updatedMarkedDates[selected]?.dots || [])],
      };
    }

    return updatedMarkedDates;
  }, [selected, markedDatesData]);

  // onDayPress 함수 수정
  const onDayPress = useCallback(
    (day) => {
      const eventDetails = eventData[day.dateString];

      // 선택된 날짜에 해당하는 월로 currentDate 업데이트
      setCurrentDate(day.dateString);

      // 선택한 날짜에 해당하는 이벤트가 있으면 모달 열기
      if (eventDetails) {
        setSelected(day.dateString);
        setHomeFrameData(eventDetails);
        modalRef.current?.open();
      } else {
        setSelected(day.dateString);
        setHomeFrameData(null);
        modalRef.current?.close();
      }
    },
    [eventData]
  );

  const renderNextMonthCalendar = useCallback(
    ({ item }) => (
      <View className="mt-[15px] mb-[20px]">
        <Calendar
          current={item}
          hideDayNames={true}
          markingType={"multi-dot"}
          theme={{
            calendarBackground: "white",
            textDayFontWeight: "400",
            textMonthFontSize: 18,
            monthTextColor: "#474A9C",
          }}
          renderArrow={() => null}
          onDayPress={(day) => {
            onDayPress(day);
            // 모달을 날짜 클릭 시에만 열도록 합니다.
            if (eventData[day.dateString]) {
              modalRef.current?.open();
            }
          }}
          markedDates={markedDates}
        />
      </View>
    ),
    [markedDates, onDayPress, eventData]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-[#50C3FA] h-full w-full">
        <View className="h-[100px] justify-center items-center mt-[-30px] mb-[50px]">
          <View className="w-[350px] flex-1 items-center px-4">
            <ButtonRow className="justify-center">
              <TouchableOpacity activeOpacity={1} onPress={goToHome}>
                <Text className="font-pblack text-2xl text-white">Mate</Text>
              </TouchableOpacity>
              <ButtonRow className="mt-0 justify-center ml-[-30px]">
                <TouchableOpacity activeOpacity={1} onPress={goToPreviousMonth}>
                  <ArrowLeft width={24} height={24} />
                </TouchableOpacity>
                <Text className="font-pbold text-[20px] text-white mx-[10px]">
                  {moment(currentDate).format("YYYY.MM")}
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
        <View className="bg-white h-full">
          <FlatList
            ref={flatListRef}
            data={generateMonths(currentDate)}
            renderItem={renderNextMonthCalendar}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            windowSize={3}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>

        {/* Modalize 추가 */}
        <Modalize
          ref={modalRef}
          adjustToContentHeight
          modalTopOffset={68}
          handlePosition="inside"
          alwaysOpen={selected ? 68 : 0} // 모달이 기본적으로 68px만큼 올라와 있도록 설정
          modalStyle={{
            backgroundColor: "white", // 배경색 추가
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            shadowColor: "#000",
            shadowOffset: { width: 100, height: 500 }, // 수직 오프셋을 더 크게
            shadowOpacity: 1, // 불투명도 증가 (1은 완전 불투명)
            shadowRadius: 10, // 흐림 정도 조정
            elevation: 24, // Android 그림자 깊이 증가
          }}
        >
          <View style={{ padding: 20 }}>
            <HomeFrame {...homeFrameData} />
          </View>
        </Modalize>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Schedule;
