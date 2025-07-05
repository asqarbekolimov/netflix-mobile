import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { IMovie } from "@/types";
import { image185 } from "@/lib/api";
import { usePathname, useRouter } from "expo-router";

type MovieCardProps = {
  item: IMovie;
};

const { width, height } = Dimensions.get("window");

export default function MovieCard({ item }: MovieCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View>
      <TouchableWithoutFeedback
        className="text-white"
        onPress={() =>
          router.push(`/movie/${item?.id}?type=${pathname === "/tv" && "tv"}`)
        }
      >
        <Image
          source={{
            uri: `${image185(item?.poster_path)}`,
          }}
          style={styles.image}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 10,
  },
});
