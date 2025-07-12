import { MovieList } from '@/entities/movie/ui';
import { RenderMovieSearchAndFilters } from './reder-movie-search-and-filters';
import { mockMovies, Movie } from '@/entities/movie/types';

const HomePage = () => {
  const onMovieClick = (movie: Movie) => {
    console.log(movie);
  };

  const onFavoriteClick = (movie: Movie) => {
    console.log(movie);
  };

  return (
    <>
      <RenderMovieSearchAndFilters />
      <MovieList
        movies={mockMovies}
        onMovieClick={onMovieClick}
        onFavoriteClick={onFavoriteClick}
      />
    </>
  );
};
export default HomePage;
