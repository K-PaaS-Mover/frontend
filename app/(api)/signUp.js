// api/signUp.js
import axios from "axios";

// 기본 API URL 설정
const API_BASE_URL = "http://localhost:8080/";
/**
 * 회원가입 API 호출
 * @param {Object} data - 회원가입에 필요한 데이터
 * @returns {Promise} - Axios 응답 프라미스
 */

export const signUp = async (data) => {
  console.log("회원가입 데이터:", data); // 데이터 출력
  try {
    const response = await axios.post(`${API_BASE_URL}members/sign-up`, data);
    console.log("회원가입 데이터:", data); // 데이터 출력
    return response.data;
  } catch (error) {
    // 에러 핸들링
    if (error.response) {
      console.error("Error checking ID:", error.response.data); // 에러 세부 정보 출력
      Alert.alert("중복 오류", error.response.data.message || "아이디 중복 확인 중 오류 발생");
      throw new Error(error.response.data.message || "아이디 중복 확인 중 오류 발생");
    } else if (error.request) {
      Alert.alert("오류", "서버에 응답이 없습니다.");
      throw new Error("서버에 응답이 없습니다.");
    } else {
      Alert.alert("오류", "요청 오류: " + error.message);
      throw new Error("요청 오류: " + error.message);
    }
  }
};

/**
 * 아이디 중복 확인 API 호출
 * @param {string} id - 확인할 아이디
 * @returns {Promise} - Axios 응답 프라미스 (true: 중복, false: 중복 아님)
 */

export const checkIdDuplicate = async (id) => {
  try {
    console.log("Checking ID:", id);

    // 쿼리 파라미터로 아이디를 전달
    const response = await axios.post(
      `${API_BASE_URL}members/sign-up/validate-username?username=${encodeURIComponent(id)}`
    );

    // 중복 검사를 위한 API가 성공적으로 호출된 경우
    return false; // 중복되지 않음
  } catch (error) {
    // console.error("Error checking ID:", error.response ? error.response.data : error.message);
    // 에러 핸들링 수정
    if (error.response) {
      // 서버에서 반환된 에러 메시지 사용
      Alert.alert("중복 오류", error.response.data.message || "아이디 중복 확인 중 오류 발생");
      throw new Error(error.response.data.message || "아이디 중복 확인 중 오류 발생");
    } else if (error.request) {
      Alert.alert("오류", "서버에 응답이 없습니다.");
      throw new Error("서버에 응답이 없습니다.");
    } else {
      Alert.alert("오류", "요청 오류: " + error.message);
      throw new Error("요청 오류: " + error.message);
    }
  }
};
