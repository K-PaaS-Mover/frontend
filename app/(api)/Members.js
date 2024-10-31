import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 임포트

// 기본 API URL 설정
const API_BASE_URL = "http://default-bjmate-1b710-100218781-a3b91276253a.kr.lb.naverncp.com:8080/";

/**
 * 비밀번호 업데이트 API 호출
 * @param {string} currentPassword - 현재 비밀번호
 * @param {string} newPassword - 새 비밀번호
 * @returns {Promise} - 업데이트 성공 여부
 */
export const updatePassword = async (currentPassword, newPassword) => {
  try {
    // 저장된 토큰을 가져와 인증 헤더에 추가
    const token = await AsyncStorage.getItem("accessToken");
    if (!token) throw new Error("로그인 상태가 아닙니다.");

    // 서버에 현재 비밀번호와 새 비밀번호를 보내어 검증 및 업데이트 요청
    const response = await axios.post(
      `${API_BASE_URL}members/update-password`,
      {
        currentPassword: currentPassword,
        updatePassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("update-password : 비밀번호 업데이트 성공");
    return { success: true, message: "비밀번호가 성공적으로 업데이트되었습니다." };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "비밀번호 업데이트 실패";
    console.log("update-password : 오류 발생", errorMessage);
    return { success: false, message: errorMessage };
  }
};
