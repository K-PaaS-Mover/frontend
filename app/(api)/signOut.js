import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 기본 API URL 설정
const API_BASE_URL = "http://localhost:8080/";

const signOut = async () => {
  try {
    // 로그아웃 요청
    const response = await axios.post(`${API_BASE_URL}members/sign-out`);

    // 요청이 성공적일 경우
    if (response.status === 200) {
      // AsyncStorage에서 사용자 데이터 삭제
      await AsyncStorage.removeItem("userToken"); // 사용자 토큰 키를 수정해 주세요.
      console.log("로그아웃 성공");
    }
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};

export default signOut;
