import { useCallback } from 'react';
import { MovieList } from '@/entities/movie/ui';
import { Movie } from '@/entities/movie/types';
import { MovieFilters } from '@/features/movie-filters';
import { MovieSearch } from '@/features/movie-search';
import { Row } from '@/shared/ui';
import { useUrlFilters } from '@/entities/movie/hooks/useUrlFilters';
import { useMovies } from '@/entities/movie/hooks/useMovies';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { filters, updateFilters } = useUrlFilters();
  const { movies, loading, error } = useMovies(filters);
  const navigate = useNavigate();

  const handleMovieClick = useCallback(
    (movie: Movie) => {
      navigate(`/movie/${movie.id}`);
    },
    [navigate]
  );

  const handleFavoriteClick = useCallback((movie: Movie) => {
    console.log('Favorite clicked:', movie);
  }, []);

  return (
    <>
      <Row gap={20}>
        <MovieSearch />
        <MovieFilters filters={filters} onFiltersChange={updateFilters} />
      </Row>

      <MovieList
        isLoading={loading}
        error={error}
        movies={movies}
        onMovieClick={handleMovieClick}
        onFavoriteClick={handleFavoriteClick}
      />
    </>
  );
};

export default HomePage;
