import { MediaListData } from "@/types";
import { Image, View } from "react-native";

type MediaListItemProps = {
  mediaItem: MediaListData;
};

export default function MediaListItem({ mediaItem }: MediaListItemProps) {
  return (
    <View>
      <Image
        source={{ uri: mediaItem.image }}
        style={{
          width: 100,
          aspectRatio: 3 / 4,
          marginHorizontal: 5,
          borderRadius: 5,
          objectFit: "cover",
        }}
      />
    </View>
  );
}
