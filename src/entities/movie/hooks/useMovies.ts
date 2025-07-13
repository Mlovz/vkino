import { useEffect } from 'react';
import { Filters } from './useUrlFilters';
import { moviesStore } from '../store/movie-store';

export const useMovies = (filters: Filters) => {
  const moviesData = moviesStore.getMoviesData(filters);

  useEffect(() => {
    moviesStore.loadMoviesInitial(filters);
  }, []);

  useEffect(() => {
    moviesStore.loadMoviesWithDebounce(filters);
  }, [
    filters.genres,
    filters.ratingMin,
    filters.ratingMax,
    filters.yearMin,
    filters.yearMax,
  ]);

  return moviesData;
};
