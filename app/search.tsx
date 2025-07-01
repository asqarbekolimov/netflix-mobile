import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMovie } from "@/types";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { imageOriginal, searchMovies } from "@/lib/api";
import { debounce } from "lodash";
import Loader from "@/components/shared/loader";

const { width, height } = Dimensions.get("window");

export default function Search() {
  const [results, setResults] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSearch = async (text: string) => {
    if (text && text.length > 3) {
      setIsLoading(true);
      const res = await searchMovies({ query: text });
      setResults(res);
      setIsLoading(false);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-[10px] mb-[10px] flex-row justify-between items-center border border-[#ccc] rounded-md">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search for a movie"
          placeholderTextColor={"lightgray"}
          className="p-[10px] text-lg flex-1 text-white font-medium"
        />
        <TouchableOpacity className="p-[10px]" onPress={() => router.push("/")}>
          <FontAwesome name="times-circle" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {results.length !== 0 ? (
            <Text className="text-lg font-medium text-white ml-[2px] pt-[10px]">
              Results: {results.length}
            </Text>
          ) : (
            <View
              className="flex-1 items-center justify-center"
              style={styles.noResults}
            >
              <Entypo name="emoji-sad" size={56} color={"white"} />
              <Text className="text-xl font-bold mt-[15px] text-white">
                Sorry, we couldn't find any results.
              </Text>
            </View>
          )}

          <View className="flex-wrap flex-row gap-[10px] mt-5">
            {results.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                onPress={() => router.push(`/details/${movie.id}`)}
              >
                <Image
                  source={{
                    uri: imageOriginal(movie.poster_path),
                  }}
                  resizeMode="cover"
                  style={styles.image}
                />
                <Text className="text-white text-base my-[5px]">
                  {movie.title.length > 18
                    ? movie.title.slice(0, 22) + "..."
                    : movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 10,
  },
  noResults: {
    marginTop: height * 0.35,
  },
});
