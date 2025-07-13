import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '@/entities/movie/hooks/useMovieDetail';
import { AppImage, Button, Loader } from '@/shared/ui';
import { AddToFavorites } from '@/features/add-to-favorites/ui';
import cls from './movie-detail.module.css';

const MovieDetailPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id || '0', 10);
  const { movie, loading, error } = useMovieDetail(movieId);

  if (loading) {
    return (
      <div className={cls.loadingContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cls.errorContainer}>
        <p>{error}</p>
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={cls.errorContainer}>
        <p>Фильм не найден</p>
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </div>
    );
  }

  return (
    <div className={cls.movieDetail}>
      <div className={cls.header}>
        <Button onClick={() => navigate(-1)} variant='secondary'>
          ← Назад
        </Button>
      </div>

      <div className={cls.content}>
        <div className={cls.poster}>
          <AppImage
            src={movie.poster?.url || movie.poster?.previewUrl}
            alt={movie.name ?? ''}
            className={cls.posterImage}
          />
          <div className={cls.favoriteButton}>
            <AddToFavorites
              movieId={movie.id}
              movieName={movie.name || movie.alternativeName}
            />
          </div>
        </div>

        <div className={cls.info}>
          <h1 className={cls.title}>{movie.name || movie.alternativeName}</h1>

          {movie.alternativeName && movie.name && (
            <p className={cls.altTitle}>{movie.alternativeName}</p>
          )}

          <div className={cls.mainInfo}>
            <div className={cls.rating}>
              <span className={cls.ratingLabel}>Рейтинг:</span>
              <span className={cls.ratingValue}>
                ⭐ {movie.rating?.kp?.toFixed(1) || 'Нет данных'}
              </span>
              {movie.rating?.imdb && (
                <span className={cls.ratingValue}>
                  IMDb: {movie.rating.imdb.toFixed(1)}
                </span>
              )}
            </div>

            <div className={cls.year}>
              <span className={cls.label}>Год:</span>
              <span>{movie.year || 'Нет данных'}</span>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className={cls.genres}>
                <span className={cls.label}>Жанры:</span>
                <div className={cls.genreList}>
                  {movie.genres.map((genre, index) => (
                    <span key={index} className={cls.genre}>
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {movie.description && (
            <div className={cls.description}>
              <h3>Описание</h3>
              <p>{movie.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MovieDetailPage;
