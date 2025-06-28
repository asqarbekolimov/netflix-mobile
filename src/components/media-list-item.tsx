import { MediaListData } from "@/types";
import { Link } from "expo-router";
import { Image, Pressable, View } from "react-native";

type MediaListItemProps = {
  mediaItem: MediaListData;
};

export default function MediaListItem({ mediaItem }: MediaListItemProps) {
  return (
    <Link href={`/media-details/${mediaItem.id}`} asChild>
      <Pressable>
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
      </Pressable>
    </Link>
  );
}
