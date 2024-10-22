import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

// import { home } from "../../constants/icons";
// import { contents } from "../../constants/icons";
// import { calendar } from "../../constants/icons";
// import { profile } from "../../constants/icons";

import Home from "../../assets/icons/home.svg";
import Contents from "../../assets/icons/contents.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Profile from "../../assets/icons/profile.svg";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#50C3FA",
          tabBarInactiveTintColor: "#1B1B1E",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            // borderTopColor: "#1B1B1E",
            shadowColor: "#1B1B1E",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Home
                width={26}
                height={26}
                fill={focused ? "#50C3FA" : "#000"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="contents"
          options={{
            title: "Contents",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Contents
                width={26}
                height={26}
                fill={focused ? "#50C3FA" : "#000"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calendarPage"
          options={{
            title: "CalendarPage",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Calendar
                width={26}
                height={26}
                fill={focused ? "#50C3FA" : "#000"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Profile
                width={26}
                height={26}
                fill={focused ? "#50C3FA" : "#000"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
