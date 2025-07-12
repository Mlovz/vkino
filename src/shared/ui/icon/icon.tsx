import { FC, JSX, memo } from 'react';
import cls from './icon.module.css';
import { icon, IconType } from './icon-type';
import { clsx } from '@/shared/lib/classnames';

interface IconProps {
  type: IconType;
  className?: string;
  onClick?: () => void;
}

const getIcon = (type: IconType): JSX.Element => icon.get(type) as JSX.Element;

const Icon: FC<IconProps> = memo(({ className, type, onClick }) => {
  return (
    <div className={clsx(cls.icon, className)} onClick={onClick}>
      {getIcon(type)}
    </div>
  );
});

export default Icon;
