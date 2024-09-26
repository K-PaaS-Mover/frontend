import { View, Text, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

// import { home } from "../../constants/icons";
// import { contents } from "../../constants/icons";
// import { calendar } from "../../constants/icons";
// import { profile } from "../../constants/icons";

import home from "../../assets/icons/home.png";
import contents from "../../assets/icons/contents.png";
import calendar from "../../assets/icons/calendar.png";
import profile from "../../assets/icons/profile.png";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-[40px] h-[40px]"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

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
            height: 97,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={home} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="contents"
          options={{
            title: "Contents",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={contents} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={calendar} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={profile} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
