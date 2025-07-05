import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { IActor } from "@/types";
import { image185 } from "@/lib/api";

type ActorCardProps = {
  actor: IActor;
};

export default function ActorCard({ actor }: ActorCardProps) {
  return (
    <TouchableOpacity className="mr-2 items-center mb-3">
      <View className="overflow-hidden items-center border border-['gray'] rounded-[50px]">
        <Image
          source={{ uri: `${image185(actor.profile_path as string)}` }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
      <Text className="text-white text-base text-center mt-2">
        {actor.character.length > 10
          ? actor.character.slice(0, 10) + "..."
          : actor.character}
      </Text>
      <Text className="text-['gray'] text-base text-center">
        {actor.original_name.length > 10
          ? actor.original_name.slice(0, 10) + "..."
          : actor.original_name}
      </Text>
    </TouchableOpacity>
  );
}
