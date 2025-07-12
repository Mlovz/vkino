import cls from './loader.module.css';

type Props = {
  position?: 'fixed' | 'static';
};

export const Loader = ({ position = 'static' }: Props) => {
  return (
    <div className={`${position === 'static' ? cls.static : cls.fixed}`}>
      <div className={cls.spinner}></div>Loading...
    </div>
  );
};
