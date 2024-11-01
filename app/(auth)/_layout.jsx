import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { UserProvider } from "../UserContext";

const AuthLayout = () => {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up-agree"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up-id"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up-name"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up-job"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up-interest"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up-finish"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </UserProvider>
  );
};

export default AuthLayout;
