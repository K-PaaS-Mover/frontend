import { View, Text, FlatList, RefreshControl, BackHandler } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";
import { useScrap } from "../ScrapContext"; // Context에서 스크랩 상태 가져오기
import { useUser } from "../UserContext"; // Context에서 사용자 정보 가져오기
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import LookScrap from "../LookScrap";
import ProfileModify from "../../components/profileScreens/profileModify";
import PasswordModify from "../../components/profileScreens/passwordModify"; // 비밀번호 수정 컴포넌트 임포트
import { StarContext } from "../StarContext";

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
  const [viewScrapped, setViewScrapped] = useState(false);
  const [viewProfileModify, setViewProfileModify] = useState(false);
  const [viewPasswordModify, setViewPasswordModify] = useState(false); // 비밀번호 수정 상태 추가

  const { userId } = useUser(); // UserContext에서 userId 가져오기
  const { scrappedItems } = useContext(StarContext); // 스크랩 아이템 가져오기
  const scrappedCount = scrappedItems.length; // 스크랩한 정책 개수

  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    // 데이터 새로고침 로직 추가 필요
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setViewScrapped(false);
      setViewProfileModify(false);
      setViewPasswordModify(false); // 비밀번호 수정 화면 초기화
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      if (viewProfileModify || viewScrapped || viewPasswordModify) {
        setViewProfileModify(false);
        setViewScrapped(false);
        setViewPasswordModify(false); // 비밀번호 수정 상태 초기화
        return true;
      }
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [navigation, viewProfileModify, viewScrapped, viewPasswordModify]);

  const getRouteForItem = (item) => {
    if (item === "프로필 수정") {
      setViewProfileModify(true); // 프로필 수정 화면으로 전환
    } else if (item === "비밀번호 수정") {
      setViewPasswordModify(true); // 비밀번호 수정 화면으로 전환
    } else {
      switch (item) {
        case "알림설정":
          return "/settings/notifications";
        case "FAQ":
          return "/faq";
        case "로그아웃":
          return "/logout";
        case "회원 탈퇴":
          return "/delete-account";
        case "약관":
          return "/terms";
        case "개인 정보 취급 방침":
          return "/privacy-policy";
        default:
          return "/home";
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <FlatList
        data={[]} // 실제 데이터로 교체 필요
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => {}} // 실제 데이터로 교체 필요
        ListHeaderComponent={() => (
          <View className="mt-[-30px]">
            {!viewScrapped && !viewProfileModify && !viewPasswordModify ? (
              <>
                <View className="flex-1 justify-center items-center px-4">
                  <ButtonRow>
                    <TouchableOpacity activeOpacity={1} onPress={() => router.replace("/home")}>
                      <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
                    </TouchableOpacity>
                    <Text className="font-pbold text-[20px] pr-[35px]">설정</Text>
                    <Bell width={24} height={24} />
                  </ButtonRow>
                </View>
                <View className="flex-1 justify-start items-start ml-[35px] mt-[40px]">
                  <Text className="font-pregular text-[18px]">
                    안녕하세요 <Text className="text-[#50c3fac4]">{userId}</Text> 님,
                  </Text>
                  <Text className="font-pbold text-[20px] mt-[5px]">
                    지금까지 <Text className="text-[#50c3fac4]">{scrappedCount}</Text>개 정책을
                    스크랩했어요!
                  </Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => setViewScrapped(true)}>
                    <Text className="font-pextralight text-[12px] text-[#989DA3] mt-[20px]">
                      스크랩한 정책들을 보러 가기 →
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-[30px] border-[#EDEEF9] border-[3px] border-solid"></View>
                <View className="flex-1 items-center">
                  {[
                    "프로필 수정",
                    "알림설정",
                    "FAQ",
                    "로그아웃",
                    "회원 탈퇴",
                    "약관",
                    "개인 정보 취급 방침",
                    "비밀번호 수정",
                  ].map((item, index) => (
                    <ButtonRow className="justify-between w-[325px] mt-[20px]" key={index}>
                      <Text>{item}</Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          const route = getRouteForItem(item);
                          if (route) router.push(route);
                        }}
                      >
                        <Arrow width={24} height={24} />
                      </TouchableOpacity>
                    </ButtonRow>
                  ))}
                </View>
                <View className="mt-[25px] border-[#EDEEF9] border-[3px] border-solid"></View>
              </>
            ) : viewScrapped ? (
              <LookScrap />
            ) : viewPasswordModify ? (
              <PasswordModify /> // 비밀번호 수정 화면 렌더링
            ) : (
              <ProfileModify />
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Profile;
