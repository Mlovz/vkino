import { Loader } from '@/shared/ui';
import { Movie } from '../../types';
import { MovieCard } from '../movie-card/movie-card';
import cls from './movie-list.module.css';
import { observer } from 'mobx-react-lite';

type MovieListProps = {
  movies: Movie[];
  error?: string | null;
  isLoading?: boolean;
  onMovieClick: (movie: Movie) => void;
};

export const MovieList = observer(
  ({ movies, isLoading, error, onMovieClick }: MovieListProps) => {
    console.log(movies);

    if (isLoading) {
      return <Loader />;
    }

    if (movies.length === 0) {
      return <div className={cls.empty}>Фильмы и сериалы не найдены</div>;
    }

    if (error) {
      return <div className={cls.empty}>{error}</div>;
    }

    return (
      <div className={cls.movieList}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick} />
        ))}
      </div>
    );
  }
);
