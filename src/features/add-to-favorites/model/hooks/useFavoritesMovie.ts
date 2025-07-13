import { Movie } from '@/entities/movie/types';
import { useEffect, useState } from 'react';
import favoritesStore from '../store/favorites-store';
import { fetchMovieById } from '@/entities/movie/api';

export const useFavoritesMovie = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      try {
        const movies = await Promise.all(
          favoritesStore.favorites.map(id => fetchMovieById(id))
        );
        setFavoriteMovies(movies);
      } catch (error) {
        console.log('Ошибка при загрузке избранных фильмов', error);
        setFavoriteMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  return { favoriteMovies, isLoading };
};
