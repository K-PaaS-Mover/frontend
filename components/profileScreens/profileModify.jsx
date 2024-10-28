import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import styled from "styled-components/native";

import Profile from "../../assets/icons/profile_modify.svg";
import Bell from "../../assets/icons/bell.svg";

import * as ImagePicker from "react-native-image-picker";

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-top: 50px;
`;

const ProfileModify = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-4 mt-[-30px]">
        <ButtonRow>
          <TouchableOpacity activeOpacity={1} onPress={() => router.replace("/home")}>
            <Text className="font-pblack text-2xl text-[#50c3fac4]">Mate</Text>
          </TouchableOpacity>
          <Text className="font-pbold text-[20px] pr-[35px]">프로필</Text>
          <Bell width={24} height={24} />
        </ButtonRow>

        <TouchableOpacity onPress={handleImagePick} className="mt-[80px]">
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : (
            <Profile width={100} height={100} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileModify;
