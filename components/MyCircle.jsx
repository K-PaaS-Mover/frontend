import React, { useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;
const Circle1 = styled.View`
  width: 502px;
  height: 502px;
  border-radius: 251px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.13;
  position: absolute;
`;
const Circle2 = styled.View`
  width: 370px;
  height: 370px;
  border-radius: 251px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.19;
  position: absolute;
`;
const Circle3 = styled.View`
  width: 230px;
  height: 230px;
  border-radius: 251px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.35;
  position: absolute;
`;
const Circle4 = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 251px;
  border-color: #50c3fa;
  background-color: #50c3fa;
  border-width: 1px;
  opacity: 1;
  position: absolute;
`;
const Shape1 = styled(Animated.View)`
  width: 93px;
  height: 40px;
  border-radius: 100px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.3;
  position: absolute;
`;

const MyCircle = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 9000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Container>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Circle4 />
      <Shape1
        style={{
          transform: [
            { rotate: rotateInterpolation }, // 원의 중심을 기준으로 회전
            { translateX: 251 }, // Circle1의 반지름만큼 이동
          ],
        }}
      />
    </Container>
  );
};

export default MyCircle;
