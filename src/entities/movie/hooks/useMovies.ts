import { useEffect, useMemo } from 'react';
import { Filters } from './useUrlFilters';
import { moviesStore } from '../store/movie-store';

export const useMovies = (filters: Filters) => {
  const moviesData = moviesStore.getMoviesData(filters);

  const filtersString = useMemo(() => {
    return JSON.stringify({
      genres: filters.genres.sort(),
      ratingMin: filters.ratingMin,
      ratingMax: filters.ratingMax,
      yearMin: filters.yearMin,
      yearMax: filters.yearMax,
    });
  }, [filters]);

  useEffect(() => {
    moviesStore.loadMoviesWithDebounce(filters);
  }, [filtersString]);

  return moviesData;
};
