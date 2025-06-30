import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailList from "@assets/data/mediaDetailedList.json";
import MediaInfo from "@/components/media-details/media-info";
import { useVideoPlayer, VideoView } from "expo-video";
import MediaHeader from "@/components/media-details/media-header";
import { useRef } from "react";

export default function MediaDetails() {
  const { id } = useLocalSearchParams();
  const videoViewRef = useRef<VideoView | null>(null);

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
    trailer,
    videoUrl,
    thumbnail,
  } = mediaItem;

  const videoSource =
    type === "MOVIE" ? videoUrl : seasons?.[0]?.episodes?.[0]?.videoUrl;

  if (!videoSource) {
    return (
      <SafeAreaView>
        <Text style={{ color: "white" }}>Video source was not found</Text>
      </SafeAreaView>
    );
  }

  const trailerPlayer = useVideoPlayer(trailer, (player) => {
    player.currentTime = 10;
    player.play();
    player.muted = true;
  });

  const mediaPlayer = useVideoPlayer(videoSource, (player) => {
    player.showNowPlayingNotification = true;
  });

  const onPlayMediaPressed = () => {
    trailerPlayer.pause();
    videoViewRef.current?.enterFullscreen();
    mediaPlayer.play();
  };

  return (
    <SafeAreaView>
      <MediaHeader
        thumbnail={thumbnail}
        trailerPlayer={trailerPlayer}
        mediaPlayer={mediaPlayer}
        videoViewRef={videoViewRef}
      />
      <MediaInfo
        title={title}
        releaseYear={releaseYear}
        ageRestriction={ageRestriction}
        duration={duration}
        description={description}
        type={type}
        nrOfSeasons={seasons?.length || 0}
        onPlayMediaPressed={onPlayMediaPressed}
      />
    </SafeAreaView>
  );
}
