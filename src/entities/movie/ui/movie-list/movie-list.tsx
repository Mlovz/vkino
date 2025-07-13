import { Loader } from '@/shared/ui';
import { Movie } from '../../types';
import { MovieCard } from '../movie-card/movie-card';
import cls from './movie-list.module.css';
import { observer } from 'mobx-react-lite';
import { useInfiniteScroll } from '@/shared/hooks';

type MovieListProps = {
  movies: Movie[];
  error?: string | null;
  isLoading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onMovieClick: (movie: Movie) => void;
  onLoadMore: () => void;
};

export const MovieList = observer(
  ({
    movies,
    isLoading,
    loadingMore,
    error,
    hasMore,
    onMovieClick,
    onLoadMore,
  }: MovieListProps) => {
    const loadMoreRef = useInfiniteScroll({
      hasMore: hasMore ?? false,
      isLoading: loadingMore ?? false,
      onLoadMore,
      threshold: 0.1,
      rootMargin: '100px',
    });

    if (isLoading) {
      return <Loader />;
    }

    if (movies.length === 0 && !isLoading) {
      return <div className={cls.empty}>Фильмы и сериалы не найдены</div>;
    }

    if (error) {
      return <div className={cls.empty}>{error}</div>;
    }

    return (
      <div className={cls.movieList}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick} />
        ))}

        {hasMore && (
          <div
            ref={loadMoreRef}
            style={{
              height: '20px',
              backgroundColor: 'transparent',
            }}
          />
        )}

        {loadingMore && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <Loader />
          </div>
        )}

        {!hasMore && movies.length > 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Больше фильмов нет
          </div>
        )}
      </div>
    );
  }
);
