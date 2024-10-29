// api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 기본 API URL 설정
const API_BASE_URL = "http://default-springboot-app-s-e44df-100172874-9c694dec16d2.kr.lb.naverncp.com:8080/";

/**
 * 인증 토큰을 가져오는 함수
 * @returns {Promise<string>} - 토큰 문자열
 */
const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      return token;
    } catch (error) {
      console.error("토큰 가져오기 실패:", error);
      throw new Error("인증 토큰을 가져오는 데 실패했습니다.");
    }
};
  
/**
 * 정책 목록 조회 API 호출
 * @returns {Promise} - Axios 응답 프라미스
 */
export const getPolicies = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const response = await axios.get(`${API_BASE_URL}policy`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "정책 목록 조회 실패";
    return { success: false, message: errorMessage };
  }
};

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
 * 스크랩 추가 API 호출
 * @param {number} policyId - 정책 ID
 * @returns {Promise} - Axios 응답 프라미스
 */
export const addScrap = async (policyId) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const response = await axios.post(
      `${API_BASE_URL}policy/${policyId}/scrap`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "스크랩 추가 실패";
    return { success: false, message: errorMessage };
  }
};

/**
 * 스크랩 제거 API 호출
 * @param {number} policyId - 정책 ID
 * @returns {Promise} - Axios 응답 프라미스
 */
export const removeScrap = async (policyId) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const response = await axios.delete(`${API_BASE_URL}policy/${policyId}/scrap`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "스크랩 취소 실패";
    return { success: false, message: errorMessage };
  }
};

/**
 * 네비게이션 기록 API 호출
 * @param {number} policyId - 정책 ID
 * @returns {Promise<object>} - 응답 객체
 */
export const recordNavigateAPI = async (policyId) => {
    try {
      const token = await getAuthToken();
      const response = await axios.post(
        `${API_BASE_URL}policy/${policyId}/navigate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("네비게이션 기록 API 오류:", error);
      throw error.response?.data || new Error("네비게이션 기록에 실패했습니다.");
    }
  };
  