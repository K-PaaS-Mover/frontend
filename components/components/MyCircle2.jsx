import React, { useRef, useEffect } from "react";
import { View, Animated, Text, Easing } from "react-native";
import styled from "styled-components/native";

import Logo from "../../assets/icons/logo.svg";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
`;

const Circle = styled.View`
  border-radius: 251px;
  border-color: #50c3fa;
  border-width: 1px;
  position: absolute;
`;

const Circle1 = styled(Circle)`
  width: 502px;
  height: 502px;
  opacity: 0.05;
`;

const Circle2 = styled(Circle)`
  width: 400px;
  height: 400px;
  opacity: 0.13;
`;

const Circle3 = styled(Circle)`
  width: 290px;
  height: 290px;
  opacity: 0.19;
`;

const Circle4 = styled(Circle)`
  width: 180px;
  height: 180px;
  opacity: 0.35;
`;

const Circle5 = styled(Circle)`
  width: 100px;
  height: 100px;
  background-color: #50c3fa;
  opacity: 1;
  justify-content: center;
  align-items: center;
`;

const Shape = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  border-color: #50c3fac4;
  border-width: 1px;
  opacity: 0.3;
  position: absolute;
`;

const Shape1 = styled(Shape)`
  background-color: #50c3fac4;
`;

const Shape2 = styled(Shape)`
  border-color: #1c4458;
  background-color: #1c4458;
`;

const Shape3 = styled(Shape)`
  background-color: #50c3fac4;
`;

const Shape4 = styled(Shape)`
  border-color: #1c4458;
  background-color: #1c4458;
`;

const shapesData = [
  { component: Shape1, label: "노인 복지", angle: 0 },
  { component: Shape2, label: "창업", angle: Math.PI / 2 },
  { component: Shape3, label: "이직", angle: Math.PI },
  { component: Shape4, label: "청년 취직", angle: (3 * Math.PI) / 2 },
];

const MyCircle2 = () => {
  return (
    <Container>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Circle4 />
      <Circle5
        style={{
          shadowColor: "cyan",
          shadowOffset: {
            width: 0,
            height: -200,
          },
          shadowOpacity: 0.9,
          shadowRadius: 10.0,
          elevation: 150,
        }}
      >
        <Logo width={50} height={34} />
      </Circle5>
      {shapesData.map(({ component: ShapeComponent, label, angle }, index) => {
        const x = 50 * Math.cos(angle); // 50: Circle5 반지름
        const y = 50 * Math.sin(angle); // 50: Circle5 반지름

        return (
          <View key={index} style={{ position: "absolute", top: "50%", left: "50%" }}>
            <ShapeComponent
              style={{
                transform: [
                  { translateX: x },
                  { translateY: y },
                  { rotate: rotateInterpolate }, // rotate 값이 문자열 형식
                ],
              }}
            />
            <Text
              className="font-pthin text-[12px] text-[#50C3FA]"
              style={{ position: "absolute", top: 15, left: -6 }}
            >
              {label}
            </Text>
          </View>
        );
      })}
    </Container>
  );
};

export default MyCircle2;
