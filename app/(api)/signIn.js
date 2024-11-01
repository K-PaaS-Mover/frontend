import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트

// 기본 API URL 설정
const API_BASE_URL = "http://default-bjmate-1b710-100218781-a3b91276253a.kr.lb.naverncp.com:8080/";

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
      await AsyncStorage.setItem("username", username); // AsyncStorage에 저장
      console.log(response.data.accessToken);
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

/**
 * 로그인 상태 확인 API 호출
 * @returns {Promise} - 로그인 상태 (true: 로그인됨, false: 로그인되지 않음)
 */
export const isSignedIn = async () => {
  try {
    // AsyncStorage에서 토큰 가져오기
    const token = await AsyncStorage.getItem("accessToken");
    console.log("token :", token);
    if (!token) return false;

    // 토큰을 Authorization 헤더에 포함하여 로그인 상태 확인 요청
    const response = await axios.get(`${API_BASE_URL}members/is-signed-in`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("is-sign-in : 로그인 상태임");
    // 로그인 상태 확인 성공
    return response.data.isSignedIn || true;
  } catch (error) {
    console.log("is-sign-in : 상태 확인 실패");
    // 오류 발생 시 로그인되지 않은 것으로 간주하고 토큰 삭제
    await AsyncStorage.removeItem("accessToken");
    return false;
  }
};
