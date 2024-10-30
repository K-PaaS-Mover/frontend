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

const HomeFrame = ({ title, department, startDate, endDate, category, views, scrapCount }) => {
  return (
    <HomeFrameContainer>
      <ButtonRow className="mt-[10px] items-center ">
        {/* <OvalContainer style={{ width: category.length * 10 + 60 }}> */}
        <ButtonRow className="w-[80px] justify-center">
          <Text className="text-[#6D6D7A] font-pregular">{category}</Text>
        </ButtonRow>
        {/* </OvalContainer> */}
        <ButtonRow className="w-[130px] justify-center mr-[-20px]">
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
      <Text className={`mt-[15px] ml-[20px] font-psemibold text-[18px]`}>{title}</Text>
      <Text className={`mt-[9px] ml-[20px] font-pregular text-[#1B1B1E] text-[14px]`}>
        {department}
      </Text>
      <Text className={`ml-[20px] font-pregular text-[#1B1B1E] text-[14px]`}>
        기간 : {startDate}-{endDate}
      </Text>
    </HomeFrameContainer>
  );
};

export default HomeFrame;
