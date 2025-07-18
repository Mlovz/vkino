import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { MovieList } from '@/entities/movie/ui';
import { Movie } from '@/entities/movie/types';
import { MovieFilters } from '@/features/movie-filters';
import { MovieSearch } from '@/features/movie-search';
import { Row } from '@/shared/ui';
import { useUrlFilters } from '@/entities/movie/hooks/useUrlFilters';
import { useMovies } from '@/entities/movie/hooks/useMovies';
import { useNavigate } from 'react-router-dom';

const HomePage = observer(() => {
  const { filters, updateFilters } = useUrlFilters();
  const { movies, loading, loadingMore, error, hasMore, loadMore } =
    useMovies(filters);
  const navigate = useNavigate();

  const handleMovieClick = useCallback(
    (movie: Movie) => {
      navigate(`/movie/${movie.id}`);
    },
    [navigate]
  );

  return (
    <>
      <Row gap={20}>
        <MovieSearch />
      </Row>

      <div>
        <MovieFilters filters={filters} onFiltersChange={updateFilters} />
        <MovieList
          isLoading={loading}
          loadingMore={loadingMore}
          error={error}
          movies={movies}
          hasMore={hasMore}
          onMovieClick={handleMovieClick}
          onLoadMore={loadMore}
        />
      </div>
    </>
  );
});

export default HomePage;
