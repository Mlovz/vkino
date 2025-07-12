import React, { useState, useMemo } from 'react';
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
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // TODO: была проблема перерасчета стилей при изменении других пропсов, в результате происходил перерендер - поэтому в useMemo
  const containerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  // TODO: была проблема возврата каждый раз новой ссылки в результате происходил перерендер - поэтому в useMemo
  const defaultPlaceholder = useMemo(
    () => <div className={cls.defaultPlaceholder}>Кинопоиск</div>,
    []
  );

  const currentPlaceholder = placeholder || defaultPlaceholder;

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
