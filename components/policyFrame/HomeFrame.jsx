// HomeFrame.jsx
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

const HomeFrame = ({ title, company, period, category, views, scrap }) => {
  return (
    <HomeFrameContainer>
      <ButtonRow className="mt-[10px] items-center ">
        <View className="w-[83px] h-[26px] rounded-[15px] border-[#D6EDF9] border-[0.3px] border-solid bg-[#D6EDF9]">
          <View className="h-full items-center justify-center">
            <Text>{category}</Text>
          </View>
        </View>
        <ButtonRow className="w-[130px] justify-center">
          <ButtonRow className="w-[80px] justify-center">
            <Views width={20} height={20} marginRight={5} />
            <Text className="text-[#6D6D7A] font-pregular">{views}</Text>
          </ButtonRow>
          <ButtonRow className="w-[80px] justify-center ml-[-20px]">
            <Scrap width={20} height={20} marginRight={5} />
            <Text className="text-[#6D6D7A] font-pregular">{scrap}</Text>
          </ButtonRow>
        </ButtonRow>
      </ButtonRow>
      <Text className={`mt-[15px] ml-[20px] font-psemibold text-[18px]`}>{title}</Text>
      <Text className={`mt-[9px] ml-[20px] font-pregular text-[#1B1B1E] text-[14px]`}>
        {company}
      </Text>
      <Text className={`ml-[20px] font-pregular text-[#1B1B1E] text-[14px]`}>기간 : {period}</Text>
    </HomeFrameContainer>
  );
};

export default HomeFrame;
