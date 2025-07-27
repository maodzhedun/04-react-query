import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

// import { useState } from 'react';

interface SearchBarProps {
  //   query: string;
  onSubmit: (query: string) => void;
}

export default function SearchBar({
  //   query,
  onSubmit,
}: SearchBarProps) {
  // const [query, setQuery] = useState<string>('');
  // const [movies, setMovies] = useState<Movie[]>([]);
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query === '') {
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(query);
    // setQuery('');
    // setMovies([]); // Clear previous movies on new search
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form action={handleSubmit} className={css.form}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
        <div>
          <Toaster />
        </div>
      </header>
    </>
  );
}
