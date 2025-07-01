import axios from "axios";
import { API_BASE_URL, API_KEY, IMAGE_BASE_URL } from "@/constants";

export const trendingMovies = async () => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const topRatedMovies = async () => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const popularMovies = async () => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const generMovies = async (type: string, id: number) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&with_genres=${id}&include_adult=false&sort_by=popularity.desc`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export const imageOriginal = (path?: string) => {
  return `${IMAGE_BASE_URL}/original${path}`;
};

export const image185 = (path?: string) => {
  return `${IMAGE_BASE_URL}/w185${path}`;
};
