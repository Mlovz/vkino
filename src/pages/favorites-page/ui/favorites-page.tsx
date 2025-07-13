import { Movie } from '@/entities/movie/types';
import { MovieList } from '@/entities/movie/ui';
import { useFavoritesMovie } from '@/features/add-to-favorites/model';
import { AppRouteKey } from '@/shared/config/route/route-types';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = observer(() => {
  const { favoriteMovies, isLoading } = useFavoritesMovie();
  const navigate = useNavigate();

  const handleMovieClick = useCallback(
    (movie: Movie) => {
      console.log('click');
      navigate(`${AppRouteKey.MOVIE}/${movie.id}`);
    },
    [navigate]
  );

  return (
    <div>
      <h1>Избранное</h1>
      <MovieList
        isLoading={isLoading}
        movies={favoriteMovies}
        onMovieClick={handleMovieClick}
        onLoadMore={() => console.log('load more')}
      />
    </div>
  );
});

export default FavoritesPage;
