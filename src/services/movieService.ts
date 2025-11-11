import type { Movie } from "../types/movie";
import axios from "axios";
const myKey: string = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MovieResponse>(
    `
https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return response.data.results;
}
