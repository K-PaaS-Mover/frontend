import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

// 기본 API URL 설정
const API_BASE_URL = "http://default-springboot-app-s-e44df-100172874-9c694dec16d2.kr.lb.naverncp.com:8080/";

/**
 * 정책 정보 조회 API 호출
 * @param {number} policyId - 정책 ID
 * @returns {Promise} - Axios 응답 프라미스
 */
export const getPolicyById = async (policyId) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const response = await axios.get(`${API_BASE_URL}policy/${policyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "정책 조회 실패";
    return { success: false, message: errorMessage };
  }
};

/**
 * 정책 정보를 화면에 표시
 * @param {number} policyId - 정책 ID
 */
export const displayPolicy = async (policyId) => {
  const policyResponse = await getPolicyById(policyId);

  if (policyResponse.success) {
    const { title, content, category, department, startDate, endDate, views, scrapCount } = policyResponse.data;

    console.log("정책 제목:", title);
    console.log("내용:", content);
    console.log("카테고리:", category);
    console.log("회사:", department);
    console.log("시작 날짜:", startDate);
    console.log("종료 날짜:", endDate);
    console.log("조회수:", views);
    console.log("스크랩 수:", scrapCount);
  } else {
    console.error("정책 정보를 불러오는데 실패했습니다:", policyResponse.message);
  }
};
