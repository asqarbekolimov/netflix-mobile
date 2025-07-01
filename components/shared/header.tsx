import { View } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/netflix.png")}
          resizeMode="contain"
          className="w-[100px] h-10"
        />

        <View className="flex-row items-center gap-[10px] !bg-transparent">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.push("/search")}
          >
            <MaterialIcons name="search" size={30} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={require("../../assets/images/avatar.jpg")}
              resizeMode="contain"
              className="w-[50px] h-[35px] rounded-[10px]"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
