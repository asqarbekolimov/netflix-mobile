import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loader() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={"#e7442e"} />
    </View>
  );
}
