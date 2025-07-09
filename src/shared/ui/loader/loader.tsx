import cls from './loader.module.css';

export const Loader = () => {
  return (
    <div className={cls.loading}>
      <div className={cls.spinner}></div>Loading...
    </div>
  );
};
