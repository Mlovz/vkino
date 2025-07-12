// @/pages/home/render-movie-search-and-filters.tsx
import { useSearchParams } from 'react-router-dom';
import { MovieFilters } from '@/features/movie-filters';
import { MovieSearch } from '@/features/movie-search';
import { Row } from '@/shared/ui';
import { Filters } from '@/features/movie-filters/model/types';

export const RenderMovieSearchAndFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = {
    genres: searchParams.get('genres')?.split(',') || [],
    ratingMin: searchParams.has('ratingMin')
      ? parseFloat(searchParams.get('ratingMin')!)
      : undefined,
    ratingMax: searchParams.has('ratingMax')
      ? parseFloat(searchParams.get('ratingMax')!)
      : undefined,
    yearMin: searchParams.has('yearMin')
      ? parseInt(searchParams.get('yearMin')!)
      : undefined,
    yearMax: searchParams.has('yearMax')
      ? parseInt(searchParams.get('yearMax')!)
      : undefined,
  };

  const applyFilters = (newFilters: Partial<Filters>) => {
    const params = new URLSearchParams(searchParams);

    if (newFilters.genres) {
      if (newFilters.genres.length > 0) {
        params.set('genres', newFilters.genres.join(','));
      } else {
        params.delete('genres');
      }
    }

    if (newFilters.ratingMin !== undefined) {
      params.set('ratingMin', newFilters.ratingMin.toString());
    } else {
      params.delete('ratingMin');
    }

    if (newFilters.ratingMax !== undefined) {
      params.set('ratingMax', newFilters.ratingMax.toString());
    } else {
      params.delete('ratingMax');
    }

    if (newFilters.yearMin !== undefined) {
      params.set('yearMin', newFilters.yearMin.toString());
    } else {
      params.delete('yearMin');
    }

    if (newFilters.yearMax !== undefined) {
      params.set('yearMax', newFilters.yearMax.toString());
    } else {
      params.delete('yearMax');
    }

    setSearchParams(params);
  };

  return (
    <Row gap={20} align='center'>
      <MovieFilters filters={filters} onFiltersChange={applyFilters} />
      <MovieSearch />
    </Row>
  );
};
