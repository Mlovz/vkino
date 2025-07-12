// AppImage.tsx
import React, { useState } from 'react';
import cls from './image.module.css';
import { clsx } from '@/shared/lib/classnames';

export type AppImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: React.ReactNode;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

export const AppImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  objectFit = 'cover',
}: AppImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    console.log('Изображение загружено');
    setIsLoading(false);
  };

  const handleError = () => {
    console.log('Ошибка загрузки изображения', src);
    setIsLoading(false);
    setHasError(true);
  };

  const containerStyle = {
    width,
    height,
  };

  const defaultPlaceholder = (
    <div className={cls.defaultPlaceholder}>Кинопоиск</div>
  );
  const currentPlaceholder = placeholder || defaultPlaceholder;

  console.log(isLoading);

  return (
    <div
      className={clsx(cls.container, cls[objectFit], className)}
      style={containerStyle}
    >
      {(isLoading || hasError) && <>{currentPlaceholder}</>}

      <img
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={clsx(
          cls.image,
          isLoading || hasError ? cls.hidden : undefined
        )}
      />
    </div>
  );
};
