import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 기본 API URL 설정
const API_BASE_URL = "http://default-bjmate-1b710-100218781-a3b91276253a.kr.lb.naverncp.com:8080/";

export const signOut = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken"); // 저장된 토큰 가져오기
    console.log("토큰: ", token);

    // 로그아웃 요청
    const response = await axios.post(
      `${API_BASE_URL}members/sign-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 헤더에 토큰 추가
        },
      }
    );

    // 응답이 정상적으로 오면
    if (response.status === 200) {
      // 서버 응답이 문자열인 경우
      if (typeof response.data === "string") {
        console.log("로그아웃 성공:", response.data);
        await AsyncStorage.removeItem("accessToken"); // 토큰 삭제
        return { success: true }; // 성공 시 객체 반환
      } else {
        console.error("로그아웃 실패:", response.data.message || "알 수 없는 오류");
        return { success: false, message: response.data.message || "알 수 없는 오류" }; // 실패 시 객체 반환
      }
    } else {
      console.error("응답 상태 코드:", response.status);
      return { success: false, message: "응답 상태 코드: " + response.status }; // 상태 코드가 200이 아닐 경우
    }
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    return { success: false, message: error.message }; // 오류 발생 시 객체 반환
  }
};
