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

const HomeFrameDetail = ({ selectedItem = {} }) => {
  if (!selectedItem) return null;

  const { title, department, startDate, endDate, categories, views, scrapCount, content } =
    selectedItem;

  const contentWidth = Dimensions.get("window").width - 40;

  return (
    <View className="mt-[26px] flex-1 justify-start items-center">
      <View className="w-[95%] h-[140px]">
        <ButtonRow className="mt-[10px] w-[100px] ml-[-20px]">
          {/* categories 배열의 각 항목에 대해 개별 ButtonRow 생성 */}
          {categories.map((category, index) => (
            <ButtonRow
              key={index} // 리스트의 각 항목에 고유한 key 설정
              className="w-[80px] bg-[#d6edf9] rounded-[13px] mr-[5px]" // 가로 길이를 자동으로 설정하고 좌우 여백 추가
            >
              <Text className="text-[#6D6D7A] font-pregular justify-center">{category}</Text>
            </ButtonRow>
          ))}

          {/* Views와 ScrapCount 부분 */}
        </ButtonRow>
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
