import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트

// 기본 API URL 설정
const API_BASE_URL =
  "http://default-springboot-app-s-e44df-100172874-9c694dec16d2.kr.lb.naverncp.com:8080/";

/**
 * 로그인 API 호출
 * @param {string} username - 사용자 아이디
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise} - Axios 응답 프라미스
 */
export const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}members/sign-in`, {
      username,
      password,
    });

    // 로그인 성공 시, 서버에서 반환한 토큰을 AsyncStorage에 저장
    if (response.data && response.data.accessToken) {
      await AsyncStorage.setItem("accessToken", response.data.accessToken); // AsyncStorage에 저장
    }

    return { success: true, data: response.data };
  } catch (error) {
    // 오류 발생 시, API에서 제공하는 메시지를 사용
    const errorMessage = error.response?.data?.message || "로그인 실패";
    return { success: false, message: errorMessage };
  }
};

/**
 * 로그인 자격 증명 유효성 검사
 * @param {string} id - 사용자 아이디
 * @param {string} password - 사용자 비밀번호
 * @returns {boolean} - 유효성 검사 결과 (true: 유효, false: 유효하지 않음)
 */
export const validateCredentials = (id, password) => {
  if (!id || !password) {
    throw new Error("아이디와 비밀번호를 입력하세요.");
  }

  // 추가적인 유효성 검사가 필요할 경우 여기에 로직 추가
  return true; // 기본적으로 유효성 검사 통과
};
