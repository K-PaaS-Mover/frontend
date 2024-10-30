import React from "react";
import { View, Text, Dimensions } from "react-native";

import styled from "styled-components/native";

import Views from "../../../assets/icons/views.svg";
import Scrap from "../../../assets/icons/scrap.svg";
import RenderHTML from "react-native-render-html";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

const cleanCategory = (category) => {
  if (!category) return ""; // title이 없을 경우 빈 문자열 반환

  // 대괄호와 따옴표 제거하고, 쉼표로 구분된 문자열로 변환
  const cleanedCategory = category
    .replace(/[\[\]\"']/g, "") // 대괄호와 따옴표 제거
    .split(",") // 쉼표로 분리하여 배열로 변환
    .map((item) => item.trim()) // 각 항목의 공백 제거
    .join(", "); // 다시 쉼표로 연결하여 문자열로 변환

  return cleanedCategory;
};

const HomeFrameDetail = ({ selectedItem = {} }) => {
  if (!selectedItem) return null;

  const { title, department, startDate, endDate, category, views, scrapCount, content } =
    selectedItem;

  const contentWidth = Dimensions.get("window").width - 40;

  return (
    <View className="mt-[26px] flex-1 justify-start items-center">
      <View className="w-[95%] h-[140px]">
        <View className="ml-[5px] mt-[7px] w-[83px] h-[26px] rounded-[15px] border-[#D6EDF9] border-[0.3px] border-solid bg-[#D6EDF9]">
          <View className="h-full items-center justify-center font-pregular text-[12px]">
            <Text>{cleanCategory(category)}</Text>
          </View>
        </View>
        <Text className="mt-[15px] ml-[5px] font-psemibold text-[18px]">{title}</Text>
        <Text className="mt-[9px] ml-[5px] font-pregular text-[#121212] text-[12px]">
          {department}
        </Text>
        <ButtonRow className="w-[390px] justify-between">
          <Text className="font-pregular text-[#121212] text-[12px] ml-[-15px]">
            기간 : {startDate}-{endDate}
          </Text>
          <ButtonRow className="w-[100px] justify-center">
            <ButtonRow className="w-[80px] justify-center">
              <Views width={20} height={20} marginRight={5} />
              <Text className="text-[#6D6D7A] font-pregular">{views}</Text>
            </ButtonRow>
            <ButtonRow className="w-[80px] justify-center ml-[-20px]">
              <Scrap width={20} height={20} marginRight={5} />
              <Text className="text-[#6D6D7A] font-pregular">{scrapCount}</Text>
            </ButtonRow>
          </ButtonRow>
        </ButtonRow>
      </View>
      {/* content 랜더링 추가 */}
      <View className="mt-[20px] w-full">
        <RenderHTML
          contentWidth={contentWidth}
          source={{ html: content }}
          tagsStyles={{
            p: { fontSize: 14, color: "#333" },
            //추가 스타일링 정의
          }}
          ignoredDomTags={["caption", "colgroup"]}
        />
      </View>
    </View>
  );
};

export default HomeFrameDetail;
