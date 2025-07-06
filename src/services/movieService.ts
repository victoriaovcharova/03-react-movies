import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const myKey = import.meta.env.VITE_TMDB_TOKEN; // ✅ правильная переменная

  axios.defaults.baseURL = "https://api.themoviedb.org/3";

  const response = await axios.get<FetchMoviesResponse>(
    '/search/movie',
    {
      params: {
        query,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${myKey}`, // ✅ правильный заголовок
        accept: "application/json",
      },
    }
  );

  return response.data.results;
};
