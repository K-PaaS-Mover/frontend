import React, { useRef, useEffect } from "react";
import { View, Animated, Text, Easing } from "react-native";
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
  opacity: 0.05;
  position: absolute;
`;
const Circle2 = styled.View`
  width: 400px;
  height: 400px;
  border-radius: 251px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.13;
  position: absolute;
`;
const Circle3 = styled.View`
  width: 290px;
  height: 290px;
  border-radius: 251px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.19;
  position: absolute;
`;
const Circle4 = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 251px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.35;
  position: absolute;
`;
const Circle5 = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 251px;
  border-color: #50c3fa;
  background-color: #50c3fa;
  border-width: 1px;
  opacity: 1;
  position: absolute;
`;

const Shape = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 93px;
  height: 40px;
  border-radius: 100px;
  border-color: #50c3fa;
  border-width: 1px;
  opacity: 0.3;
  position: absolute;
`;

const Shape1 = styled(Shape)`
  /* top: -20px;
  right: 50px; */
`;
const Shape2 = styled(Shape)`
  /* top: -140px;
  right: 50px; */
  width: 69px;
  height: 40px;
`;
const Shape3 = styled(Shape)`
  /* top: 70px;
  left: 120px; */
  width: 69px;
  height: 40px;
`;
const Shape4 = styled(Shape)`
  /* top: -20px;
  right: 50px; */
`;

const MyCircle = () => {
  const rotateAnim1 = useRef(new Animated.Value(0)).current;
  const rotateAnim2 = useRef(new Animated.Value(0)).current;
  const rotateAnim3 = useRef(new Animated.Value(0)).current;
  const rotateAnim4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = (rotateAnim, duration, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ])
      ).start();
    };

    rotateAnimation(rotateAnim1, 10000, 0);
    rotateAnimation(rotateAnim2, 11000, 0); // Shape2는 2초 후 시작
    rotateAnimation(rotateAnim3, 12000, 0); // Shape3는 4초 후 시작
    rotateAnimation(rotateAnim4, 13000, 0); // Shape4는 6초 후 시작
  }, []);

  const rotate = (rotateAnim) =>
    rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["-270deg", "90deg"],
    });

  const rotateInterpolation = (rotateAnim) =>
    rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["270deg", "-90deg"],
    });

  return (
    <Container>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Circle4 />
      <Circle5 />
      <Shape1
        style={{
          transform: [
            { rotate: rotateInterpolation(rotateAnim1) },
            { translateX: 130 },
            { rotate: rotate(rotateAnim1) },
          ],
        }}
      >
        <Text className="font-pthin text-[12px] text-[#50C3FA]">노인 복지</Text>
      </Shape1>
      <Shape2
        style={{
          transform: [
            { rotate: rotateInterpolation(rotateAnim2) },
            { translateX: 180 },
            { rotate: rotate(rotateAnim2) },
          ],
        }}
      >
        <Text className="font-pthin text-[12px] text-[#50C3FA]">창업</Text>
      </Shape2>
      <Shape3
        style={{
          transform: [
            { rotate: rotateInterpolation(rotateAnim3) },
            { translateX: 80 },
            { rotate: rotate(rotateAnim3) },
          ],
        }}
      >
        <Text className="font-pthin text-[12px] text-[#50C3FA]">이직</Text>
      </Shape3>
      <Shape4
        style={{
          transform: [
            { rotate: rotateInterpolation(rotateAnim4) },
            { translateX: 210 },
            { rotate: rotate(rotateAnim4) },
          ],
        }}
      >
        <Text className="font-pthin text-[12px] text-[#50C3FA]">청년 취직</Text>
      </Shape4>
    </Container>
  );
};

export default MyCircle;
