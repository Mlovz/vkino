import { clsx } from '@/shared/lib/classnames';
import { Button, IconType, Modal, Row } from '@/shared/ui';
import Icon from '@/shared/ui/icon/icon';
import { useState } from 'react';
import cls from './add-to-favorites.module.css';
import favoritesStore from '../model/store/favorites-store';
import { observer } from 'mobx-react-lite';

interface Props {
  movieId: number;
  movieName: string;
}

export const AddToFavorites = observer(({ movieId, movieName }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const onToggle = () => {
    if (favoritesStore.isFavorite(movieId)) {
      favoritesStore.removeFavorite(movieId);
    } else {
      favoritesStore.addFavorite(movieId);
    }

    setShowModal(false);
  };

  return (
    <>
      <button className={cls.addToFavorites}>
        <Icon
          type={IconType.FAVORITE}
          className={clsx(favoritesStore.isFavorite(movieId) && cls.active)}
          onClick={() => setShowModal(true)}
        />
      </button>

      {showModal && (
        <Modal>
          {favoritesStore.isFavorite(movieId) ? (
            <h3>Вы уверены, что хотите удалить "{movieName}" из избранное?</h3>
          ) : (
            <h3>Вы уверены, что хотите добавить "{movieName}" в избранное?</h3>
          )}

          <Row align='center' justify='end' gap={20}>
            <Button onClick={() => setShowModal(false)} variant='secondary'>
              Нет
            </Button>
            <Button onClick={onToggle}>Да</Button>
          </Row>
        </Modal>
      )}
    </>
  );
});
