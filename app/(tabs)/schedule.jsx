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
  const [selected, setSelected] = useState("");
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [homeFrameData, setHomeFrameData] = useState(null);
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const modalRef = useRef(null);

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

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, "months").format("YYYY-MM-DD"));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, "months").format("YYYY-MM-DD"));
  }, []);

  const goToHome = useCallback(() => {
    setCurrentDate(moment().format("YYYY-MM-DD"));
    router.replace("/home");
  }, []);

  const generateMonths = useCallback((current) => {
    const months = [];
    const totalMonthsToDisplay = 3;
    for (let i = 0; i < totalMonthsToDisplay; i++) {
      months.push(moment(current).add(i, "months").format("YYYY-MM-DD"));
    }
    return months;
  }, []);

  useEffect(() => {
    const fetchScraps = async () => {
      try {
        const result = await getScraps();
        if (result.success && Array.isArray(result.data)) {
          setScraps(result.data);
        } else {
          console.error(result.message || "스크랩 데이터는 배열이어야 합니다.");
          setScraps([]);
        }
      } catch (error) {
        console.error("스크랩 데이터 fetching 에러:", error);
        setScraps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScraps();
  }, []);

  const markedDatesData = useMemo(() => {
    const marks = {};

    scraps.forEach((scrap) => {
      const { startDate, endDate, id } = scrap;

      // startDate와 endDate가 존재하는 경우
      if (startDate && endDate) {
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
      }
    });

    return marks;
  }, [scraps]);

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

  const onDayPress = useCallback(
    (day) => {
      const selectedDate = day.dateString;
      setSelected(selectedDate);
      setCurrentDate(selectedDate);

      const eventDetails = scraps.filter(
        (scrap) => moment(selectedDate).isBetween(scrap.startDate, scrap.endDate, null, "[]") // 포함 범위
      );

      if (eventDetails.length > 0) {
        console.log("eventDetails ", eventDetails);
        setHomeFrameData(eventDetails);
        console.log("homeFrameData ", homeFrameData);
        modalRef.current?.open();
      } else {
        setHomeFrameData(null);
        modalRef.current?.close();
      }
    },
    [scraps]
  );
  // homeFrameData가 업데이트된 후 모달을 열도록 useEffect 추가
  useEffect(() => {
    console.log("useEffect");
    if (homeFrameData) {
      console.log("homeFrameDate ", homeFrameData);
      modalRef.current?.open();
    } else {
      console.log("else");
      modalRef.current?.close();
    }
  }, [homeFrameData]);

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
            contentContainerStyle={{
              paddingVertical: 20,
            }}
            style={{ height: "100%" }}
          />
        </View>
      </SafeAreaView>
      <Modalize
        ref={modalRef}
        modalHeight={400}
        overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        flatListProps={{
          data: selected
            ? scraps.filter((scrap) =>
                moment(selected).isBetween(scrap.startDate, scrap.endDate, null, "[]")
              )
            : [],
          keyExtractor: (item) => item.id.toString(),
          renderItem: ({ item }) => (
            <HomeFrame
              title={item.title}
              department={item.department}
              startDate={item.startDate}
              endDate={item.endDate}
              categories={Array.isArray(item.categories) ? item.categories : [item.categories]}
              views={item.views}
              scrapCount={item.scrapCount}
            />
          ),
        }}
      />
    </GestureHandlerRootView>
  );
};

export default Schedule;
