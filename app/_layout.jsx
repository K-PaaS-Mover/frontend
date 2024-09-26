import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Pretendard-Black": require("../assets/fonts/Pretendard-Black.ttf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
    "Pretendard-Thin": require("../assets/fonts/Pretendard-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default RootLayout;
