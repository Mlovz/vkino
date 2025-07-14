import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

const enum FILTERS_KEYS {
  genres = 'genres',
  ratingMin = 'ratingMin',
  ratingMax = 'ratingMax',
  yearMin = 'yearMin',
  yearMax = 'yearMax',
}

export interface Filters {
  genres: string[];
  ratingMin?: number;
  ratingMax?: number;
  yearMin?: number;
  yearMax?: number;
}

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(() => {
    return {
      genres:
        searchParams.get(FILTERS_KEYS.genres)?.split(',').filter(Boolean) || [],
      ratingMin: searchParams.has(FILTERS_KEYS.ratingMin)
        ? parseFloat(searchParams.get(FILTERS_KEYS.ratingMin)!)
        : undefined,
      ratingMax: searchParams.has(FILTERS_KEYS.ratingMax)
        ? parseFloat(searchParams.get(FILTERS_KEYS.ratingMax)!)
        : undefined,
      yearMin: searchParams.has(FILTERS_KEYS.yearMin)
        ? parseInt(searchParams.get(FILTERS_KEYS.yearMin)!)
        : undefined,
      yearMax: searchParams.has(FILTERS_KEYS.yearMax)
        ? parseInt(searchParams.get(FILTERS_KEYS.yearMax)!)
        : undefined,
    };
  }, [searchParams.toString()]);

  const updateFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      const params = new URLSearchParams(searchParams);

      if (newFilters.genres !== undefined) {
        if (newFilters.genres.length > 0) {
          params.set(FILTERS_KEYS.genres, newFilters.genres.join(','));
        } else {
          params.delete(FILTERS_KEYS.genres);
        }
      }

      [
        FILTERS_KEYS.ratingMin,
        FILTERS_KEYS.ratingMax,
        FILTERS_KEYS.yearMin,
        FILTERS_KEYS.yearMax,
      ].forEach(key => {
        if (newFilters[key] !== undefined) {
          params.set(key, newFilters[key]!.toString());
        } else if (newFilters[key] === null) {
          params.delete(key);
        }
      });

      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return { filters, updateFilters };
};
