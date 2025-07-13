import { observer } from 'mobx-react-lite';
import { Col, Row } from '@/shared/ui';
import { allGenres } from '../model/constants';
import cls from './movie-filters.module.css';
import { useCallback } from 'react';
import { Filters } from '@/entities/movie/hooks/useUrlFilters';
import Checkbox from '@/shared/ui/checkbox/checkbox';
import DualRangeSlider from '@/shared/ui/rande-slider/dual-range-slider';

interface MovieFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
}

export const MovieFilters = observer(
  ({ filters, onFiltersChange }: MovieFiltersProps) => {
    const handleGenreChange = useCallback(
      (genre: string) => (checked: boolean) => {
        const newGenres = checked
          ? [...filters.genres, genre]
          : filters.genres.filter(g => g !== genre);

        onFiltersChange({ genres: newGenres });
      },
      [filters.genres, onFiltersChange]
    );

    const handleRatingMinChange = useCallback(
      (value: number) => {
        onFiltersChange({ ratingMin: value });
      },
      [onFiltersChange]
    );

    const handleRatingMaxChange = useCallback(
      (value: number) => {
        onFiltersChange({ ratingMax: value });
      },
      [onFiltersChange]
    );

    const handleYearMinChange = useCallback(
      (value: number) => {
        onFiltersChange({ yearMin: value });
      },
      [onFiltersChange]
    );

    const handleYearMaxChange = useCallback(
      (value: number) => {
        onFiltersChange({ yearMax: value });
      },
      [onFiltersChange]
    );

    const formatRating = useCallback((value: number) => value.toFixed(1), []);

    return (
      <div className={cls.filtersWrapper}>
        <div className={cls.filtersPanel}>
          <Col align='start' gap={20}>
            <Col align='start'>
              <h3>Жанры</h3>
              <Row gap={10} wrap='wrap'>
                {allGenres.map(genre => (
                  <Checkbox
                    key={genre}
                    label={genre}
                    checked={filters.genres.includes(genre)}
                    onChange={handleGenreChange(genre)}
                    className={cls.genreCheckbox}
                  />
                ))}
              </Row>
            </Col>

            <Row align='start' gap={20} wrap='wrap'>
              <Col align='start' className={cls.filterGroup}>
                <DualRangeSlider
                  label='Рейтинг'
                  min={0}
                  max={10}
                  step={0.1}
                  valueMin={filters.ratingMin ?? 0}
                  valueMax={filters.ratingMax ?? 10}
                  onMinChange={handleRatingMinChange}
                  onMaxChange={handleRatingMaxChange}
                  formatValue={formatRating}
                  className={cls.ratingSlider}
                />
              </Col>

              <Col align='start' className={cls.filterGroup}>
                <DualRangeSlider
                  label='Годы'
                  min={1990}
                  max={2025}
                  step={1}
                  valueMin={filters.yearMin ?? 1990}
                  valueMax={filters.yearMax ?? 2025}
                  onMinChange={handleYearMinChange}
                  onMaxChange={handleYearMaxChange}
                  className={cls.yearSlider}
                />
              </Col>
            </Row>
          </Col>
        </div>
      </div>
    );
  }
);
