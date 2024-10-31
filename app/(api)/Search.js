import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트

// 기본 API URL 설정
const API_BASE_URL = "http://default-bjmate-1b710-100218781-a3b91276253a.kr.lb.naverncp.com:8080/";

/**
 * 정책 검색 API 호출
 * @param {string} query - 검색어
 * @returns {Promise} - 검색된 정책 목록을 반환
 */
export const searchPolicies = async (query) => {
  try {
    // 저장된 토큰을 가져와 인증 헤더에 추가
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("로그인 상태가 아닙니다.");

    // 검색 요청
    const response = await axios.get(`${API_BASE_URL}search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query,
      },
    });

    console.log("search : 검색 성공", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "검색 실패";
    console.log("search : 오류 발생", errorMessage);
    return { success: false, message: errorMessage };
  }
};
