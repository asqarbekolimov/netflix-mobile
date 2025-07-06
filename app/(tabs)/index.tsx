import MovieCard from "@/components/card/movie-card";
import Banner from "@/components/shared/banner";
import Loader from "@/components/shared/loader";
import { useGloabalContext } from "@/context";
import { popularMovies, topRatedMovies, trendingMovies } from "@/lib/api";
import { IMovie } from "@/types";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function Browse() {
  const [trending, setTrending] = useState<IMovie[]>([]);
  const [topRated, setTopRated] = useState<IMovie[]>([]);
  const [popular, setPopular] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useGloabalContext();

  if (isLoading) return <Loader />;
  if (user === null) return <Redirect href={"/auth"} />;

  useEffect(() => {
    getTrendingMovies();
    getTopRatedMovies();
    getPopularMovies();
  }, []);

  const getTrendingMovies = async () => {
    setIsLoading(true);
    const trending = await trendingMovies();
    setTrending(trending);
    setIsLoading(false);
  };

  const getTopRatedMovies = async () => {
    const topRated = await topRatedMovies();
    setTopRated(topRated);
  };
  const getPopularMovies = async () => {
    const popular = await popularMovies();
    setPopular(popular);
  };

  if (isLoading) return <Loader />;

  return (
    <ScrollView>
      <View className="flex-1">
        <Banner movies={popular} />
        <View className="flex-col gap-y-[25px] mt-[50px]">
          <View>
            <Text className="text-lg text-white ml-[5px] mb-[10px]">
              Trending Movies
            </Text>
            <FlatList
              data={trending}
              renderItem={({ item }) => <MovieCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={{ gap: 15 }}
            />
          </View>
          <View>
            <Text className="text-lg text-white ml-[5px] mb-[10px]">
              Top rated
            </Text>
            <FlatList
              data={topRated}
              renderItem={({ item }) => <MovieCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={{ gap: 15 }}
            />
          </View>
          <View>
            <Text className="text-lg text-white ml-[5px] mb-[10px]">
              Popular Movies
            </Text>
            <FlatList
              data={popular}
              renderItem={({ item }) => <MovieCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={{ gap: 15 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
