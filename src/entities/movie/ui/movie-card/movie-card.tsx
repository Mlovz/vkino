import { memo } from 'react';
import cls from './movie-card.module.css';
import { Movie } from '../../types';
import { AppImage } from '@/shared/ui';
import { AddToFavorites } from '@/features/add-to-favorites/ui';

type Props = {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
  onFavoriteClick: (movie: Movie) => void;
};

export const MovieCard = memo(
  ({ movie, onMovieClick, onFavoriteClick }: Props) => {
    return (
      <div className={cls.card}>
        <div className={cls.imageContainer}>
          <AppImage
            src={movie.poster?.url || movie.poster?.previewUrl}
            alt={movie.name ?? ''}
            className={cls.image}
            // onClick={() => onMovieClick(movie)}
          />

          <AddToFavorites movie={movie} onFavoriteClick={onFavoriteClick} />
        </div>
        <div className={cls.content}>
          <h3 className={cls.title} onClick={() => onMovieClick(movie)}>
            {movie.name}
          </h3>
          <div className={cls.details}>
            <span className={cls.detailItem}>
              🗓
              {movie.year}
            </span>
            <span className={cls.detailItem}>
              ⭐{movie.rating.kp.toFixed(1)}
            </span>
          </div>
          <div className={cls.genres}>
            {movie.genres?.slice(0, 3).map((genre, i) => (
              <span key={i} className={cls.genre}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
