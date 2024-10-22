import { View, Text, BackHandler, FlatList } from "react-native";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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

const CalendarPage = () => {
  const [viewScrapped, setViewScrapped] = useState(false);
  const [selected, setSelected] = useState("");
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const flatListRef = useRef(null);

  // 뒤로 가기 버튼 처리
  useEffect(() => {
    const backAction = () => {
      if (viewScrapped) {
        setViewScrapped(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [viewScrapped]);

  // 이전 달로 이동
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((prevDate) =>
      moment(prevDate).subtract(1, "months").format("YYYY-MM-DD")
    );
  }, []);

  // 다음 달로 이동
  const goToNextMonth = useCallback(() => {
    setCurrentDate((prevDate) =>
      moment(prevDate).add(1, "months").format("YYYY-MM-DD")
    );
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

  // markedDates를 useMemo로 캐싱하여 성능 최적화
  const markedDates = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#50C3FA",
        selectedTextColor: "#FFFFFF",
        disableTouchEvent: true,
        selectedDotColor: "orange",
      },
    }),
    [selected]
  );

  // Calendar 컴포넌트를 메모이제이션
  const renderCalendar = useCallback(
    ({ item }) => (
      <View className="mt-[15px] mb-[20px]">
        <Calendar
          current={item}
          onDayPress={(day) => {
            setSelected(day.dateString);
            setCurrentDate(day.dateString); // 선택된 날짜로 currentDate 업데이트
          }}
          markedDates={markedDates}
          renderArrow={() => null}
          hideDayNames={true}
          theme={{
            calendarBackground: "white",
            textDayFontWeight: "400",
            textMonthFontSize: 18,
            monthTextColor: "#474A9C",
          }}
        />
      </View>
    ),
    [markedDates]
  );

  return (
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
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
              (day, index) => (
                <View key={index} className="flex-1 items-center">
                  <Text className="font-pregular text-[12px] text-white">
                    {day}
                  </Text>
                </View>
              )
            )}
          </ButtonRow>
        </View>
      </View>
      <View className="bg-white h-full">
        <FlatList
          ref={flatListRef}
          data={generateMonths(currentDate)}
          renderItem={renderCalendar}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          windowSize={3} // 렌더링할 달 수 제한
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarPage;
