import { Button, Col, Row } from '@/shared/ui';
import { allGenres } from '../model/constants';
import cls from './movie-filters.module.css';
import { useOutsideClick } from '@/shared/hooks';
import { useState, useCallback } from 'react';
import { Filters } from '@/entities/movie/hooks/useUrlFilters';

interface MovieFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
}

export const MovieFilters = ({
  filters,
  onFiltersChange,
}: MovieFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: есть проблема с кликом на самой кнопки при закрытия
  const ref = useOutsideClick<HTMLDivElement>({
    fn: () => setIsOpen(false),
    enabled: isOpen,
  });

  const handleGenreChange = useCallback(
    (genre: string) => {
      const newGenres = filters.genres.includes(genre)
        ? filters.genres.filter(g => g !== genre)
        : [...filters.genres, genre];

      onFiltersChange({ genres: newGenres });
    },
    [filters.genres, onFiltersChange]
  );

  const createRangeHandler = useCallback(
    (key: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key.includes('rating')
        ? parseFloat(e.target.value)
        : parseInt(e.target.value);

      onFiltersChange({ [key]: value });
    },
    [onFiltersChange]
  );

  return (
    <div className={cls.filtersWrapper}>
      <Button variant='secondary' onClick={() => setIsOpen(!isOpen)}>
        Фильтры
      </Button>

      {isOpen && (
        <div className={cls.filtersPanel} ref={ref}>
          <Col align='start' gap={20}>
            <Col align='start'>
              <h3>Жанры</h3>
              <Row gap={10} wrap='wrap'>
                {allGenres.map(genre => (
                  <label key={genre} className={cls.genreItem}>
                    <input
                      type='checkbox'
                      checked={filters.genres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />
                    <span>{genre}</span>
                  </label>
                ))}
              </Row>
            </Col>

            <Col align='start'>
              <h3>Рейтинг</h3>
              <div className={cls.rangeContainer}>
                <input
                  type='range'
                  min='0'
                  max='10'
                  step='0.1'
                  value={filters.ratingMin ?? 0}
                  onChange={createRangeHandler('ratingMin')}
                />
                <span>{filters.ratingMin ?? 0}</span>
                <span>-</span>
                <input
                  type='range'
                  min='0'
                  max='10'
                  step='0.1'
                  value={filters.ratingMax ?? 10}
                  onChange={createRangeHandler('ratingMax')}
                />
                <span>{filters.ratingMax ?? 10}</span>
              </div>
            </Col>

            <Col align='start'>
              <h3>Годы</h3>
              <div className={cls.rangeContainer}>
                <input
                  type='range'
                  min='1990'
                  max='2025'
                  value={filters.yearMin ?? 1990}
                  onChange={createRangeHandler('yearMin')}
                />
                <span>{filters.yearMin ?? 1990}</span>
                <span>-</span>
                <input
                  type='range'
                  min='1990'
                  max='2025'
                  value={filters.yearMax ?? 2025}
                  onChange={createRangeHandler('yearMax')}
                />
                <span>{filters.yearMax ?? 2025}</span>
              </div>
            </Col>
          </Col>
        </div>
      )}
    </div>
  );
};
