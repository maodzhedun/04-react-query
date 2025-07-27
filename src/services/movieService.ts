import axios from 'axios';
import type { Movie } from '../types/movie';

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/search/movie';


interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface FetchMovieParams {
  query: string;
  page: number;
}

export const fetchMovies = async (
  params: FetchMovieParams
): Promise<MovieHttpResponse> => {
  const response = await axios.get<MovieHttpResponse>(API_URL, {
    params: {query: params.query, page: params.page},
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};
