import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Score from "./screens/ScoreStack/Score";
import Gift from "./screens/GiftStack/Gift";
import MyAccount from "./screens/MyAccountStack/MyAccount";

import {
  GiftStackFnc,
  HomeStack,
  MyAccountStackFnc,
  ReservationStackFnc,
  ScoreStackFnc,
} from "./StackFnc/Stack";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#ffffff", // 탭 바 배경색
            borderTopWidth: 1,
            borderTopColor: "#ccc", // 탭 바 경계선 색상
            marginBottom: 5,
            paddingTop: 5,
          },
          tabBarActiveTintColor: "#1d1d1d", // 활성화된 탭 색상
          tabBarInactiveTintColor: "#c9c9c9", // 비활성화된 탭 색상
          tabBarLabelStyle: {
            fontSize: 9, // 탭 레이블 글씨 크기
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarLabel: "홈",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ReservationStackFnc"
          component={ReservationStackFnc}
          options={{
            headerShown: false,
            tabBarLabel: "나의 예약",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "calendar-sharp" : "calendar-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ScoreStackFnc"
          component={ScoreStackFnc}
          options={{
            headerShown: false,
            tabBarLabel: "스코어",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "clipboard" : "clipboard-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="GiftStackFnc"
          component={GiftStackFnc}
          options={{
            headerShown: false,
            tabBarLabel: "혜택",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "gift" : "gift-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MyAccountStackFnc"
          component={MyAccountStackFnc}
          options={{
            headerShown: false,
            tabBarLabel: "MY",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
