// HomeFrame.jsx
import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import Views from "../../assets/icons/views.svg";
import Scrap from "../../assets/icons/scrap.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

const HomeFrameContainer = styled.View`
  width: 95%;
  height: 140px;
  border: 1px solid #dfe3e7;
  border-radius: 17px;
  margin-top: 25px;
  justify-content: center;
  padding: 10px;
  margin-left: 10px;
`;
const OvalContainer = styled.View`
  background-color: #d6edf9;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  height: 30px; /* 고정 높이 */
  padding: 0 10px; /* 양쪽 패딩 추가 */
`;

const HomeFrame = ({ title, department, startDate, endDate, categories, views, scrapCount }) => {
  return (
    <HomeFrameContainer>
      <ButtonRow className="mt-[10px] w-[100px]">
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
      <ButtonRow>
        <Text className="mt-[15px] font-psemibold text-[18px]">{title}</Text>
        <ButtonRow className="w-[130px] justify-center mr-[-30px]">
          <ButtonRow className="mt-[15px] w-[80px] justify-center mr-[-15px]">
            <Views width={20} height={20} marginRight={5} />
            <Text className="text-[#6D6D7A] font-pregular">{views}</Text>
          </ButtonRow>
          <ButtonRow className="mt-[15px] w-[80px] justify-center ml-[-20px]">
            <Scrap width={20} height={20} marginRight={5} />
            <Text className="text-[#6D6D7A] font-pregular">{scrapCount}</Text>
          </ButtonRow>
        </ButtonRow>
      </ButtonRow>

      {/* 아래에 제목, 부서, 기간 정보 표시 */}
      <Text className="mt-[9px] ml-[20px] font-pregular text-[#1B1B1E] text-[14px]">
        {department}
      </Text>
      <Text className="ml-[20px] font-pregular text-[#1B1B1E] text-[14px]">
        기간 : {startDate}-{endDate}
      </Text>
    </HomeFrameContainer>
  );
};

export default HomeFrame;
