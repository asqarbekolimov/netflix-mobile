import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { image500, movieCredits, movieDetials, similarMovies } from "@/lib/api";
import { IActor, IMovie } from "@/types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "@/components/shared/loader";
import { LinearGradient } from "expo-linear-gradient";
import ActorCard from "@/components/card/actor-card";
import MovieCard from "@/components/card/movie-card";

const { width, height } = Dimensions.get("window");

export default function MovieDetail() {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actors, setActors] = useState<IActor[]>([]);
  const [similar, setSimilar] = useState<IMovie[]>([]);

  const { id } = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const router = useRouter();

  const type = local.type === "tv" ? "tv" : "movie";

  useEffect(() => {
    getMovieDetails();
    getMovieActor();
    getSimilarMovies();
  }, []);

  const getMovieDetails = async () => {
    setIsLoading(true);
    const data = await movieDetials(+id, type);
    setMovie(data);
    setIsLoading(false);
  };

  const getMovieActor = async () => {
    const data = await movieCredits(+id, type);
    setActors(data);
  };
  const getSimilarMovies = async () => {
    const data = await similarMovies(+id, type);
    setSimilar(data);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="w-full">
        <SafeAreaView className="absolute z-[20px] flex-row justify-between items-center w-full py-5">
          <View className="flex-row bg-transparent gap-[10px]">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
            <Image
              source={require("../../assets/images/netflix.png")}
              resizeMode="contain"
              className="w-[150px] h-[40px]"
            />
          </View>

          <TouchableOpacity>
            <AntDesign name="heart" size={30} color={"white"} />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <View style={{ height: height }}>
            <Loader />
          </View>
        ) : (
          <View>
            <Image
              source={{ uri: `${image500(movie?.poster_path)}` }}
              style={{ width: width, height: height * 0.7, objectFit: "cover" }}
            />
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 1)"]}
              style={{
                width,
                height: height * 0.4,
                position: "absolute",
                bottom: 0,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      <View className="flex-col gap-4">
        <Text className="text-white text-center text-[30px] font-bold">
          {movie?.title}
        </Text>
        <Text className="text-center text-[20px] text-[gray]">
          {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
          {movie?.runtime} min
        </Text>
        <View className="flex-row gap-[10px] justify-center">
          {movie?.genres?.map((genre, idx) => (
            <Text key={idx} className="text-[gray] text-base">
              {genre?.name} {idx + 1 !== movie.genres.length ? "•" : null}
            </Text>
          ))}
        </View>
        <Text className="text-white ml-[10px]">{movie?.overview}</Text>
      </View>

      {actors.length > 0 && (
        <View className="mt-5 mb-[10px]">
          <Text className="text-xl font-bold ml-[10px] mb-5 text-white">
            Actors
          </Text>
          <FlatList
            data={actors}
            renderItem={({ item }) => <ActorCard actor={item} />}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
          />
        </View>
      )}
      <View>
        <Text className="text-xl font-bold ml-[10px] mb-5 text-white">
          Similar Movies
        </Text>
        <FlatList
          data={similar}
          renderItem={({ item }) => <MovieCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={{ gap: 15 }}
        />
      </View>
    </ScrollView>
  );
}
