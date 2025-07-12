import { MovieFilters } from '@/features/movie-filters';
import { Filters } from '@/features/movie-filters/model/types';
import { MovieSearch } from '@/features/movie-search';
import { Row } from '@/shared/ui';
import { useState } from 'react';

export const RenderMovieSearchAndFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    genres: [],
    ratingRange: [0, 10],
    yearRange: [1990, 2025],
  });

  return (
    <Row gap={20} align='center' style={{ padding: '0 1rem' }}>
      <MovieFilters filters={filters} onFiltersChange={setFilters} />
      <MovieSearch />
    </Row>
  );
};
