// app/(api)/Policy.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://default-bjmate-65e1d-100195000-76b9fed28ce6.kr.lb.naverncp.com:8080/";

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

// /**
//  * 정책 목록 조회 API 호출
//  * @returns {Promise} - Axios 응답 프라미스
//  */
// export const getPolicies = async () => {
//   try {
//     const token = await AsyncStorage.getItem("accessToken");
//     console.log("가져온 토큰:", token); // 로그 추가
//     const response = await axios.get(`${API_BASE_URL}policy/${policyId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error("정책 목록 조회 오류:", error); // 전체 에러 출력
//     const errorMessage = error.response?.data?.message || "정책 목록 조회 실패";
//     return { success: false, message: errorMessage };
//   }
// };

/**
 * 추천 정책 조회 API 호출
 * @returns {Promise} - Axios 응답 프라미스
 */
export const getRecommendedPolicies = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_BASE_URL}policy/recommendation`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "추천 정책 조회 실패";
    return { success: false, message: errorMessage };
  }
};

// /**
//  * 카테고리별 정책 조회 API 호출
//  * @param {string} category - 정책 카테고리
//  * @returns {Promise} - Axios 응답 프라미스
//  */
// export const getPoliciesByCategory = async (category) => {
//   try {
//     const token = await getAuthToken();
//     console.log("가져온 토큰:", token);
//     console.log("전달하는 카테고리:", category);
//     const response = await axios.get(`${API_BASE_URL}policy/all-policies`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: { category },
//     });

//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error("카테고리별 정책 조회 오류:", error); // 전체 에러 출력
//     const errorMessage = error.response?.data?.message || "카테고리별 정책 조회 실패";
//     return { success: false, message: errorMessage };
//   }
// };

/**
 * 카테고리별 정책 조회 API 호출
 * @param {Array<string>} categories - 정책 카테고리 리스트
 * @returns {Promise} - Axios 응답 프라미스
 */
export const getPoliciesByCategory = async (categories) => {
  try {
    const token = await getAuthToken();
    console.log("가져온 토큰:", token);
    console.log("전달하는 카테고리 리스트:", categories);
    const response = await axios.get(`${API_BASE_URL}policy/all-policies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { categories },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("카테고리별 정책 조회 오류:", error); // 전체 에러 출력
    const errorMessage = error.response?.data?.message || "카테고리별 정책 조회 실패";
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
    const token = await getAuthToken();
    console.log("Authorization Token:", token); // 토큰 로그
    const response = await axios.get(`${API_BASE_URL}policy/${policyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("API 호출 오류:", error); // 에러 로그
    const errorMessage = error.response?.data?.message || "정책 조회 실패";
    return { success: false, message: errorMessage };
  }
};

/**
 * 스크랩 상태 확인 API 호출
 * @param {number} policyId - 정책 ID
 * @returns {Promise} - Axios 응답 프라미스
 */
export const checkScrapStatus = async (policyId) => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${API_BASE_URL}policy/scrap/${policyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data }; // 예: { scrapped: true/false }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "스크랩 상태 확인 실패";
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
    const token = await getAuthToken();
    const response = await axios.post(
      `${API_BASE_URL}policy/scrap/${policyId}`,
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
    const token = await getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}policy/scrap/${policyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "스크랩 제거 실패";
    return { success: false, message: errorMessage };
  }
};
