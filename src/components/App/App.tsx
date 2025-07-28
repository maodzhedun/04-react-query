import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { type Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import type { MovieResponse } from '../../types/movieResponse';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const {
    data: MovieResponse, // moviesHttpResponse
    // error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useQuery<MovieResponse>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies({ query, page: page }),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  const movies = MovieResponse?.results ?? [];
  const totalPages = MovieResponse?.total_pages ?? 0;

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    if (!searchQuery) {
      toast.error('Please enter a search term.');
    }
    //     if (error) {
    //   toast.error('No movies found for your query.');
    //   return;
    // }


    // if (movies.length === 0) {
    //   toast.error('No movies found for your query.');
    //   return;
    // }
    };

  useEffect(() => {
  if (isSuccess && movies.length === 0) {
    toast.error('No movies found for your query.');
  }
}, [isSuccess, movies]);

  return (
    <>
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        {isSuccess &&
          totalPages > 1 &&(
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        {isLoading && isFetching && <Loader />}
        {isError && <ErrorMessage />}
        {movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={openModal} />
        )}
        {isModalOpen && selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={closeModal} />
        )}

        <div>
          <Toaster />
        </div>
      </div>
    </>
  );
}
