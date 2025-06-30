import { VideoPlayer, VideoView } from "expo-video";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { RefObject, useState } from "react";

type MediaHeaderProps = {
  thumbnail: string;
  trailerPlayer: VideoPlayer;
  mediaPlayer: VideoPlayer;
  videoViewRef?: RefObject<VideoView | null>;
};

export default function MediaHeader(props: MediaHeaderProps) {
  const [isTrailerLoading, setIsTrailerLoading] = useState(true);

  const { thumbnail, trailerPlayer, mediaPlayer, videoViewRef } = props;
  return (
    <View style={styles.container}>
      <AntDesign
        name="closecircle"
        size={24}
        color={"#3b3b3b"}
        style={styles.closeIcon}
        onPress={() => {
          router.back();
        }}
      />
      <ImageBackground
        source={{ uri: thumbnail }}
        style={[StyleSheet.absoluteFill, styles.imageBg]}
      >
        <ActivityIndicator size={"large"} color={"white"} />
      </ImageBackground>
      <VideoView
        style={StyleSheet.absoluteFill}
        player={trailerPlayer}
        onFirstFrameRender={() => {
          setIsTrailerLoading(false);
        }}
        contentFit="cover"
      />
      <VideoView
        ref={videoViewRef}
        player={mediaPlayer}
        onFullscreenExit={() => {
          mediaPlayer.pause();
          trailerPlayer.play();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 256,
    width: "100%",
  },
  imageBg: {
    justifyContent: "center",
    opacity: 0.6,
  },
  closeIcon: {
    zIndex: 1,
    alignSelf: "flex-end",
    paddingTop: 20,
    paddingRight: 10,
  },
});
