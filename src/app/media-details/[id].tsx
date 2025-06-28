import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailList from "@assets/data/mediaDetailedList.json";
import MediaInfo from "@/components/media-details/media-info";

export default function MediaDetails() {
  const { id } = useLocalSearchParams();
  const mediaItem = mediaDetailList.find((item) => item.id === id);

  if (!mediaItem) {
    return (
      <SafeAreaView>
        <Text style={{ color: "white" }}>Media item was not found</Text>
      </SafeAreaView>
    );
  }

  const {
    title,
    releaseYear,
    ageRestriction,
    duration,
    description,
    type,
    seasons,
  } = mediaItem;

  return (
    <SafeAreaView>
      <MediaInfo
        title={title}
        releaseYear={releaseYear}
        ageRestriction={ageRestriction}
        duration={duration}
        description={description}
        type={type}
        nrOfSeasons={seasons?.length || 0}
      />
    </SafeAreaView>
  );
}
