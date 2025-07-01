import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function MyList() {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-xl font-bold text-white">
        You don't have any list yet.
      </Text>

      <Link href="/" className="mt-[10px] px-4">
        <Text className="text-sm text-[#E7442E]">Browse page!</Text>
      </Link>
    </View>
  );
}
