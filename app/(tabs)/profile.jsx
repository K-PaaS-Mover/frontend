import {
  View,
  Text,
  FlatList,
  RefreshControl,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import LookScrap from "../../components/LookScrap";

import Bell from "../../assets/icons/bell.svg";
import Arrow from "../../assets/icons/arrow.svg";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [viewScrapped, setViewScrapped] = useState(false); // 스크랩 화면 보기 상태

  const onRefresh = async () => {
    setRefreshing(true);
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

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // 컴포넌트 언마운트 시 핸들러 제거
  }, [viewScrapped]);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => {}}
        ListHeaderComponent={() => (
          <View className="mt-[-30px]">
            {!viewScrapped ? ( // viewScrapped에 따른 조건부 렌더링
              <>
                <View className="flex-1 justify-center items-center px-4">
                  <ButtonRow>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => router.replace("/home")}
                    >
                      <Text className="font-pblack text-2xl text-[#50c3fac4]">
                        Mate
                      </Text>
                    </TouchableOpacity>
                    <Text className="font-pbold text-[20px] pr-[35px]">
                      설정
                    </Text>
                    <Bell width={24} height={24} />
                  </ButtonRow>
                </View>
                <View className="flex-1 justify-start items-start ml-[35px] mt-[40px]">
                  <Text className="font-pregular text-[18px]">
                    안녕하세요{" "}
                    <Text className="text-[#50c3fac4]">uoonjudori</Text>
                    님,
                  </Text>
                  <Text className="font-pbold text-[20px] mt-[5px]">
                    지금까지 <Text className="text-[#50c3fac4]">00</Text>개
                    정책을 스크랩했어요!
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setViewScrapped(true)}
                  >
                    <Text className="font-pextralight text-[12px] text-[#989DA3] mt-[20px]">
                      스크랩한 정책들을 보러 가기 →
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-[30px] border-[#EDEEF9] border-[3px] border-solid"></View>
                <View className="flex-1 items-center mt-[-20px]">
                  <ButtonRow className="justify-between w-[325px]">
                    <Text>프로필 수정</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/home")}
                    >
                      <Arrow width={24} height={24} />
                    </TouchableOpacity>
                  </ButtonRow>
                  <ButtonRow className="justify-between w-[325px] mt-[20px]">
                    <Text>알림설정</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/home")}
                    >
                      <Arrow width={24} height={24} />
                    </TouchableOpacity>
                  </ButtonRow>
                  <ButtonRow className="justify-between w-[325px] mt-[20px]">
                    <Text>FAQ</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/home")}
                    >
                      <Arrow width={24} height={24} />
                    </TouchableOpacity>
                  </ButtonRow>
                </View>
                <View className="mt-[25px] border-[#EDEEF9] border-[3px] border-solid"></View>
                <View className="flex-1 items-center mt-[-20px]">
                  <ButtonRow className="justify-between w-[325px]">
                    <Text>로그아웃</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/home")}
                    >
                      <Arrow width={24} height={24} />
                    </TouchableOpacity>
                  </ButtonRow>
                  <ButtonRow className="justify-between w-[325px] mt-[20px]">
                    <Text>회원 탈퇴</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/home")}
                    >
                      <Arrow width={24} height={24} />
                    </TouchableOpacity>
                  </ButtonRow>
                  <ButtonRow className="justify-between w-[325px] mt-[20px]">
                    <Text>약관</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/home")}
                    >
                      <Arrow width={24} height={24} />
                    </TouchableOpacity>
                  </ButtonRow>
                  <ButtonRow className="justify-between w-[325px] mt-[20px]">
                    <Text>개인 정보 취급 방침</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/home")}
                    >
                      <Arrow width={24} height={24} />
                    </TouchableOpacity>
                  </ButtonRow>
                </View>
              </>
            ) : (
              // 스크랩된 정책 화면
              <LookScrap />
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
