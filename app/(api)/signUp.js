// api/signUp.js
import axios from 'axios';

// 기본 API URL 설정
const API_BASE_URL = 'http://localhost:8080'; // 실제 서버 IP로 변경 필요할 수 있음

/**
 * 회원가입 API 호출
 * @param {Object} data - 회원가입에 필요한 데이터
 * @returns {Promise} - Axios 응답 프라미스
 */
export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/members/sign-up/`, data);
    return response.data;
  } catch (error) {
    // 에러 핸들링
    if (error.response) {
      // 서버가 응답했으나 상태 코드가 2xx가 아님
      throw new Error(error.response.data.message || '서버 오류');
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못함
      throw new Error('서버에 응답이 없습니다.');
    } else {
      // 요청 설정 중 오류 발생
      throw new Error('요청 오류');
    }
  }
};
