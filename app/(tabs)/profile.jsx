import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";
import { StatusBar } from "react-native-web";

import Bell from "../../assets/icons/bell.svg";
import Arrow from "../../assets/icons/arrow.svg";

import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import IconButton from "../../components/IconButton";
import CustomButton from "../../components/CustomButton";
import HomeFrame from "../../components/HomeFrame";
import SearchFocus from "../../components/SearchFocus";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
  /* background-color: #faf; */
`;

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null); // SearchInput의 ref 생성

  const onRefresh = async () => {
    setRefreshing(true);
    // 리프레시 처리 로직
    setRefreshing(false);
  };

  useEffect(() => {
    const backAction = () => {
      if (isSearchFocused) {
        setIsSearchFocused(false);
        return true; // 뒤로가기를 처리했음을 알림
      }
      return false; // 뒤로가기를 기본 동작으로 처리하게 함
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isSearchFocused]);

  useEffect(() => {
    if (isSearchFocused && searchInputRef.current) {
      searchInputRef.current.focus(); // isSearchFocused가 true일 때 포커스 설정
    }
  }, [isSearchFocused]);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <FlatList
        data={[]}
        // data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={() => {}}
        ListHeaderComponent={() => (
          <View className="mt-[-30px]">
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
                <Text className="font-pbold text-[20px] pr-[35px]">설정</Text>
                <Bell width={24} height={24} />
              </ButtonRow>
            </View>
            <View className="flex-1 justify-start items-start ml-[35px] mt-[40px]">
              <Text className="font-pregular text-[18px]">
                안녕하세요 <Text className="text-[#50c3fac4]">uoonjudori</Text>
                님,
              </Text>
              <Text className="font-pbold text-[20px] mt-[5px]">
                지금까지 <Text className="text-[#50c3fac4]">00</Text>개 정책을
                스크랩했어요!
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.replace("/home")}
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
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }} // 적절한 padding 추가
        // 화면을 아래로 당기면 새로고침
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
