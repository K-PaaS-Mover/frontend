// schedule.jsx

import { View, Text, BackHandler, FlatList, ActivityIndicator } from "react-native";
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
// import EditCalendar from "../../assets/icons/edit_calendar.svg"; // 필요 시 주석 해제

import { getScraps } from "../(api)/Calendor"; // API 모듈 임포트

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
  const [scraps, setScraps] = useState([]); // 스크랩 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
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

  // API로부터 스크랩 데이터 가져오기
  useEffect(() => {
    const fetchScraps = async () => {
      try {
        const result = await getScraps();
        if (result.success) {
          setScraps(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("스크랩 데이터 fetching 에러:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScraps();
  }, []);

  // startDate와 endDate를 기반으로 markedDates 생성
  const markedDatesData = useMemo(() => {
    const marks = {};

    scraps.forEach((scrap) => {
      const { startDate, endDate, id } = scrap;
      const start = moment(startDate);
      const end = moment(endDate);

      for (let m = moment(start); m.diff(end, "days") <= 0; m.add(1, "days")) {
        const dateStr = m.format("YYYY-MM-DD");
        if (marks[dateStr]) {
          marks[dateStr].dots.push({ key: `${id}`, color: "#FFC830" });
        } else {
          marks[dateStr] = {
            dots: [{ key: `${id}`, color: "#FFC830" }],
          };
        }
      }
    });

    return marks;
  }, [scraps]);

  // selected 날짜를 포함하여 markedDates 업데이트
  const markedDates = useMemo(() => {
    const updatedMarkedDates = { ...markedDatesData };

    if (selected) {
      updatedMarkedDates[selected] = {
        ...(updatedMarkedDates[selected] || {}),
        selected: true,
        selectedColor: "#50C3FA",
        selectedTextColor: "#FFFFFF",
      };
    }

    return updatedMarkedDates;
  }, [selected, markedDatesData]);

  // onDayPress 함수 수정
  const onDayPress = useCallback(
    (day) => {
      const selectedDate = day.dateString;
      setSelected(selectedDate);
      setCurrentDate(selectedDate);

      // 선택한 날짜에 해당하는 스크랩 필터링
      const eventDetails = scraps.filter(
        (scrap) => moment(selectedDate).isBetween(scrap.startDate, scrap.endDate, undefined, "[]") // 포함 범위
      );

      if (eventDetails.length > 0) {
        setHomeFrameData(eventDetails);
        modalRef.current?.open();
      } else {
        setHomeFrameData(null);
        modalRef.current?.close();
      }
    },
    [scraps]
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
          onDayPress={onDayPress}
          markedDates={markedDates}
          hideExtraDays={true}
        />
      </View>
    ),
    [markedDates, onDayPress]
  );

  if (loading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView className="bg-[#50C3FA] h-full w-full justify-center items-center">
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text className="text-white mt-4">로딩 중...</Text>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-[#50C3FA] h-full w-full">
        <View className="h-[100px] justify-center items-center mt-[-30px] mb-[50px]">
          <View className="w-[350px] flex-1 items-center px-4">
            <ButtonRow className="justify-center ml-[-25px]">
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
              {/* <EditCalendar width={24} height={24} /> */}
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
            shadowOffset: { width: 0, height: -3 }, // 적절한 그림자 설정
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5, // Android 그림자 깊이 증가
          }}
        >
          <View style={{ padding: 20 }}>
            {homeFrameData ? (
              homeFrameData.map((event) => <HomeFrame key={event.id} {...event} />)
            ) : (
              <Text>이벤트가 없습니다.</Text>
            )}
          </View>
        </Modalize>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Schedule;
