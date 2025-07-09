import cls from './header.module.css';
import Logo from '@/shared/assets/logo.svg';

export const Header = () => {
  return (
    <header className={cls.header}>
      <div className={cls.header_wrap}>
        <div className={cls.header_row}>
          <img src={Logo} alt='' />
        </div>
      </div>
    </header>
  );
};
