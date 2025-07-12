import { clsx } from '@/shared/lib/classnames';
import { IconType } from '@/shared/ui';
import Icon from '@/shared/ui/icon/icon';
import { useState } from 'react';
import cls from './add-to-favorites.module.css';
import { Movie } from '@/entities/movie/types';

type Props = {
  onFavoriteClick: (movie: Movie) => void;
  movie: Movie;
};

export const AddToFavorites = ({ onFavoriteClick, movie }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={() => onFavoriteClick(movie)}
      className={cls.addToFavorites}
    >
      <Icon
        type={IconType.FAVORITE}
        className={clsx(isFavorite && cls.active)}
        onClick={onFavorite}
      />
    </button>
  );
};
