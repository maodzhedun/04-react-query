import axios from 'axios';
import type { Movie } from '../types/movie';

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/search/movie';
// axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;

interface MovieHttpResponse {
  results: Movie[];
}

interface FetchMovieParams {
  query: string;
}

export const fetchMovies = async (
  params: FetchMovieParams
): Promise<Movie[]> => {
  const response = await axios.get<MovieHttpResponse>(API_URL, {
    params: {query: params.query},
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data.results;
};
