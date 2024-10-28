import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

import Home from "../../assets/icons/home.svg";
import Contents from "../../assets/icons/contents.svg";
import CalendarEdit from "../../assets/icons/calendar.svg";
import Profile from "../../assets/icons/profile.svg";

import { ScrapProvider } from "../ScrapContext";
import { UserProvider } from "../UserContext";

const TabsLayout = () => {
  return (
    <ScrapProvider>
      <UserProvider>
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
                <Home width={26} height={26} fill={focused ? "#50C3FA" : "#000"} />
              ),
            }}
          />
          <Tabs.Screen
            name="contents"
            options={{
              title: "Contents",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Contents width={26} height={26} fill={focused ? "#50C3FA" : "#000"} />
              ),
            }}
          />
          <Tabs.Screen
            name="schedule"
            options={{
              title: "Schedule",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <CalendarEdit width={26} height={26} fill={focused ? "#50C3FA" : "#000"} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Profile width={26} height={26} fill={focused ? "#50C3FA" : "#000"} />
              ),
            }}
          />
        </Tabs>
      </UserProvider>
    </ScrapProvider>
  );
};

export default TabsLayout;
