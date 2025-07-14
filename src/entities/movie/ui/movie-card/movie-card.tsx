import { memo } from 'react';
import cls from './movie-card.module.css';
import { Movie } from '../../types';
import { AppImage, IconType } from '@/shared/ui';
import { AddToFavorites } from '@/features/add-to-favorites/ui';
import Icon from '@/shared/ui/icon/icon';

type Props = {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
};

export const MovieCard = memo(({ movie, onMovieClick }: Props) => {
  return (
    <div className={cls.card}>
      <div className={cls.imageContainer}>
        <AppImage
          src={movie.poster?.url || movie.poster?.previewUrl}
          alt={movie.name ?? ''}
          className={cls.image}
        />

        <AddToFavorites
          movieId={movie.id}
          movieName={movie.name || movie.alternativeName}
        />
      </div>
      <div className={cls.content}>
        <h3 className={cls.title} onClick={() => onMovieClick(movie)}>
          {movie.name || movie.alternativeName}
        </h3>
        <div className={cls.details}>
          <span className={cls.detailItem}>
            🗓
            {movie.year}
          </span>
          <span className={cls.detailItem}>
            <Icon type={IconType.STAR} />
            {movie?.rating?.kp.toFixed(1)}
          </span>
        </div>
        <div className={cls.genres}>
          {movie.genres?.slice(0, 3).map((genre, i) => (
            <span key={i} className={cls.genre}>
              {genre?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
