import { Button, IconType, Row } from '@/shared/ui';
import cls from './header.module.css';
import Logo from '@/shared/assets/logo.svg';
import { ROUTES } from '@/shared/config/route/route-paths';
import Icon from '@/shared/ui/icon/icon';
import favoritesStore from '@/features/add-to-favorites/model/store/favorites-store';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
  return (
    <header className={cls.header}>
      <div className={cls.header_wrap}>
        <Row align='center' justify='between'>
          <img src={Logo} alt='' />
          <nav>
            <Row align='center' gap={20} className={cls.nav}>
              <Button
                as='a'
                href={ROUTES.main}
                variant='primary'
                className={cls.btn}
              >
                Все фильмы
              </Button>
              <Button
                as='a'
                href={ROUTES.favorites}
                variant='secondary'
                className={cls.btn}
              >
                <span className={cls.iconBtn}>
                  <Icon type={IconType.FAVORITE} />
                </span>
                Избранное ({favoritesStore.favorites.length})
              </Button>
            </Row>
          </nav>
        </Row>
      </div>
    </header>
  );
});
