import { Tabs } from "expo-router";
import React from "react";

import { ShoppingIcon, TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff", // 배경색
          borderTopColor: "#ccc", // 테두리 색
          borderTopWidth: 1, // 테두리 두께
        },
      }}
    >
      <Tabs.Screen
        name="shopping/index"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ flexDirection: "column" }}>
              <TabBarIcon
                name={focused ? "bag-handle" : "bag-handle-outline"}
                color={color}
              />
              <Text
                style={{
                  color,
                  fontSize: 8,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                쇼핑
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ flexDirection: "column" }}>
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
              <Text
                style={{
                  color,
                  fontSize: 8,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                홈
              </Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="content/index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ flexDirection: "column" }}>
              <TabBarIcon
                name={focused ? "document-text" : "document-text-outline"}
                color={color}
              />
              <Text
                style={{
                  color,
                  fontSize: 8,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                콘텐츠
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="clip/index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ flexDirection: "column" }}>
              <TabBarIcon
                name={focused ? "play-circle" : "play-circle-outline"}
                color={color}
              />
              <Text
                style={{
                  color,
                  fontSize: 8,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                클립
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
