import { Row } from '@/shared/ui';
import { mockMovies, Movie } from '../../types';
import { MovieCard } from '../movie-card/movie-card';
import cls from './movie-list.module.css';

export const MovieList = () => {
  const onMovieClick = (movie: Movie) => {
    console.log(movie);
  };

  const onFavoriteClick = (movie: Movie) => {
    console.log(movie);
  };

  return (
    <Row wrap='wrap' gap={30} className={cls.movieList}>
      {mockMovies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
          onFavoriteClick={onFavoriteClick}
          isFavorite={true}
        />
      ))}
    </Row>
  );
};
