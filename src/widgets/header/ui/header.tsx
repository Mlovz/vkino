import { Row } from '@/shared/ui';
import cls from './header.module.css';
import Logo from '@/shared/assets/logo.svg';

export const Header = () => {
  return (
    <header className={cls.header}>
      <div className={cls.header_wrap}>
        <Row align='center' justify='between'>
          <img src={Logo} alt='' />
          <h1>Hello</h1>
        </Row>
      </div>
    </header>
  );
};
