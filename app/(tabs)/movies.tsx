import { FlatList, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  generMovies,
  popularMovies,
  topRatedMovies,
  trendingMovies,
} from "@/lib/api";
import Loader from "@/components/shared/loader";
import Banner from "@/components/shared/banner";
import MovieCard from "@/components/card/movie-card";
import { IMovie } from "@/types";

export default function Movies() {
  const [comedy, setComedy] = useState<IMovie[]>([]);
  const [documentary, setDocumentary] = useState<IMovie[]>([]);
  const [family, setFamily] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTrendingMovies();
    getTopRatedMovies();
    getPopularMovies();
  }, []);

  const getTrendingMovies = async () => {
    setIsLoading(true);
    const comedy = await generMovies("movie", 35);
    setComedy(comedy);
    setIsLoading(false);
  };

  const getTopRatedMovies = async () => {
    const documentary = await generMovies("movie", 99);
    setDocumentary(documentary);
  };
  const getPopularMovies = async () => {
    const family = await generMovies("movie", 10751);
    setFamily(family);
  };

  if (isLoading) return <Loader />;

  return (
    <ScrollView>
      <View className="flex-1">
        <Banner movies={comedy} />
        <View className="flex-col gap-y-[25px] mt-[50px]">
          <View>
            <Text className="text-lg text-white ml-[5px] mb-[10px]">
              Comedy
            </Text>
            <FlatList
              data={comedy}
              renderItem={({ item }) => <MovieCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={{ gap: 15 }}
            />
          </View>
          <View>
            <Text className="text-lg text-white ml-[5px] mb-[10px]">
              Documentary
            </Text>
            <FlatList
              data={documentary}
              renderItem={({ item }) => <MovieCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              contentContainerStyle={{ gap: 15 }}
            />
          </View>
          <View>
            <Text className="text-lg text-white ml-[5px] mb-[10px]">
              Family
            </Text>
            <FlatList
              data={family}
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
