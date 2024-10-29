// app/(api)/Calendar.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://default-bjmate-11b2d-100192567-88c9bd227f80.kr.lb.naverncp.com:8080/";

/**
 * 인증 토큰을 가져오는 함수
 * @returns {Promise<string>} - 토큰 문자열
 */
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 존재하지 않습니다.");
    }
    return token;
  } catch (error) {
    console.error("토큰 가져오기 실패:", error);
    throw new Error("인증 토큰을 가져오는 데 실패했습니다.");
  }
};

/**
 * 스크랩 목록 조회 API 호출
 * @returns {Promise} - Axios 응답 프라미스
 */
export const getScraps = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_BASE_URL}calendor/getScraps`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("스크랩 목록 조회 오류:", error);
    const errorMessage = error.response?.data?.message || "스크랩 목록 조회 실패";
    return { success: false, message: errorMessage };
  }
};
