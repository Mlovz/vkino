import { useEffect } from 'react';
import { movieDetailStore } from '../store/movie-detail-store';

export const useMovieDetail = (id: number) => {
  const movieData = movieDetailStore.getMovieData(id);

  useEffect(() => {
    if (id) {
      movieDetailStore.loadMovie(id);
    }
  }, [id]);

  return movieData;
};
