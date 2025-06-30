import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { IMovie } from "@/types";

type Props = {
  movies: IMovie[];
};

export default function Banner({ movies }: Props) {
  const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
  useEffect(() => {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    setRandomMovie(movie);
  }, [movies]);
  return (
    <View>
      <Text>Banner</Text>
    </View>
  );
}
