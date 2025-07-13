import { useEffect, useRef, useState } from 'react';
import { fetchMovies } from '@/entities/movie/api';
import { Movie } from '@/entities/movie/types';
import { Filters } from './useUrlFilters';

const SELECTED_FIELDS = [
  'id',
  'name',
  'alternativeName',
  'year',
  'rating',
  'poster',
  'genres',
];

export const useMovies = (filters: Filters) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiFilters = {
          selectFields: SELECTED_FIELDS,
          'genres.name': filters.genres.length > 0 ? filters.genres : undefined,
          'rating.kp':
            filters.ratingMin !== undefined && filters.ratingMax !== undefined
              ? `${filters.ratingMin}-${filters.ratingMax}`
              : undefined,
          yearMin: filters.yearMin,
          yearMax: filters.yearMax,
          page: 1,
          limit: 10,
        };

        const data = await fetchMovies(apiFilters);
        setMovies(data.docs);
      } catch {
        setError('Ошибка загрузки фильмов');
      } finally {
        setLoading(false);
      }
    };

    debounceTimeoutRef.current = setTimeout(loadMovies, 300);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [
    filters.genres,
    filters.ratingMin,
    filters.ratingMax,
    filters.yearMin,
    filters.yearMax,
  ]);

  return { movies, loading, error };
};
