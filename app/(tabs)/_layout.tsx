import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Entypo } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Browse",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: "Movies",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="video-library" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tv"
        options={{
          title: "TV",
          tabBarIcon: ({ color }) => (
            <Entypo name="tv" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-list"
        options={{
          title: "My List",
          tabBarIcon: ({ color }) => (
            <Entypo name="list" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
