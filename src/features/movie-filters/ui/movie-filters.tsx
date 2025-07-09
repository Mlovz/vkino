import { Button, Col, Row } from '@/shared/ui';
import { Filters } from '../model/types';
import { useState } from 'react';
import { allGenres } from '../model/constants';
import cls from './movie-filters.module.css';
import { useOutsideClick } from '@/shared/hooks';

type MovieFiltersProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
};

export const MovieFilters = ({
  filters,
  onFiltersChange,
}: MovieFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>({
    fn: () => setIsOpen(false),
    enabled: isOpen,
  });

  const onOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  const handleGenreChange = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter(g => g !== genre)
      : [...filters.genres, genre];

    onFiltersChange({
      ...filters,
      genres: newGenres,
    });
  };

  return (
    <div className={cls.filtersWrapper}>
      <Button variant='secondary' onClick={onOpen}>
        Фильтры
      </Button>

      {isOpen && (
        <div className={cls.filtersPanel} ref={ref}>
          <Col align='start' gap={20}>
            <Col align='start'>
              <h3 className={cls.filterTitle}>Жанры</h3>
              <Row gap={10} wrap='wrap'>
                {allGenres.map(genre => (
                  <label key={genre} className={cls.genreItem}>
                    <input
                      type='checkbox'
                      checked={filters.genres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      className={cls.checkbox}
                    />
                    <span className={cls.genreLabel}>{genre}</span>
                  </label>
                ))}
              </Row>
            </Col>

            <Col align='start'>
              <h3 className={cls.filterTitle}>Рейтинг</h3>
              <div className={cls.rangeContainer}>
                <input
                  type='range'
                  min='0'
                  max='10'
                  step='0.1'
                  value={filters.ratingRange[0]}
                  onChange={e =>
                    onFiltersChange({
                      ...filters,
                      ratingRange: [
                        parseFloat(e.target.value),
                        filters.ratingRange[1],
                      ],
                    })
                  }
                  className={cls.rangeInput}
                />
                <span className={cls.rangeValue}>{filters.ratingRange[0]}</span>
                <span className={cls.rangeSeparator}>-</span>
                <input
                  type='range'
                  min='0'
                  max='10'
                  step='0.1'
                  value={filters.ratingRange[1]}
                  onChange={e =>
                    onFiltersChange({
                      ...filters,
                      ratingRange: [
                        filters.ratingRange[0],
                        parseFloat(e.target.value),
                      ],
                    })
                  }
                  className={cls.rangeInput}
                />
                <span className={cls.rangeValue}>{filters.ratingRange[1]}</span>
              </div>
            </Col>

            <Col align='start'>
              <h3 className={cls.filterTitle}>Годы</h3>
              <div className={cls.rangeContainer}>
                <input
                  type='range'
                  min='1990'
                  max='2024'
                  value={filters.yearRange[0]}
                  onChange={e =>
                    onFiltersChange({
                      ...filters,
                      yearRange: [
                        parseInt(e.target.value),
                        filters.yearRange[1],
                      ],
                    })
                  }
                  className={cls.rangeInput}
                />
                <span className={cls.yearValue}>{filters.yearRange[0]}</span>
                <span className={cls.rangeSeparator}>-</span>
                <input
                  type='range'
                  min='1990'
                  max='2024'
                  value={filters.yearRange[1]}
                  onChange={e =>
                    onFiltersChange({
                      ...filters,
                      yearRange: [
                        filters.yearRange[0],
                        parseInt(e.target.value),
                      ],
                    })
                  }
                  className={cls.rangeInput}
                />
                <span className={cls.yearValue}>{filters.yearRange[1]}</span>
              </div>
            </Col>
          </Col>
        </div>
      )}
    </div>
  );
};
