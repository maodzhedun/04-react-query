import type { Movie } from './movie';

export interface MovieResponse {
    results: Movie[];
    total_pages: number;
    total_results: number;
}