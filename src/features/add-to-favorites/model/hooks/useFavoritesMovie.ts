import { Movie } from '@/entities/movie/types';
import { useEffect, useState } from 'react';
import favoritesStore from '../store/favorites-store';
import { fetchMovieById } from '@/entities/movie/api';

export const useFavoritesMovie = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const movies = await Promise.all(
        favoritesStore.favorites.map(id => fetchMovieById(id))
      );
      setFavoriteMovies(movies);
    };
    loadFavorites();
  }, []);

  return favoriteMovies;
};
