import { Button, Row } from '@/shared/ui';
import cls from './header.module.css';
import Logo from '@/shared/assets/logo.svg';
import { ROUTES } from '@/shared/config/route/route-paths';

export const Header = () => {
  return (
    <header className={cls.header}>
      <div className={cls.header_wrap}>
        <Row align='center' justify='between'>
          <img src={Logo} alt='' />
          <nav>
            <Row align='center' gap={20}>
              <Button as='a' href={ROUTES.main} variant='primary'>
                Все фильмы
              </Button>
              <Button
                as='a'
                href={ROUTES.favorites}
                variant='secondary'
                className='flex items-center gap-2'
              >
                🤍 Избранное (0)
              </Button>
            </Row>
          </nav>
        </Row>
      </div>
    </header>
  );
};
