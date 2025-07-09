import { ComponentProps, forwardRef, memo, useMemo } from 'react';
import cls from './button.module.css';

const variants = {
  primary: cls.primary,
  secondary: cls.secondary,
  outline: cls.outline,
} as const;

const sizes = {
  sm: cls.sizeSM,
  md: cls.sizeMD,
  lg: cls.sizeLG,
  xl: cls.sizeXL,
} as const;

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
};

type ButtonProps = BaseButtonProps &
  Omit<ComponentProps<'button'>, keyof BaseButtonProps> & {
    as?: 'button';
    href?: never;
    target?: never;
    rel?: never;
  };

type AnchorProps = BaseButtonProps &
  Omit<ComponentProps<'a'>, keyof BaseButtonProps> & {
    as?: 'a';
    href?: string;
  };

type Props = ButtonProps | AnchorProps;

// TODO: я так и не понял, как сделать так чтобы не прописывать условии для каждого AS

export const Button = memo(
  forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
    (
      {
        variant = 'primary',
        size = 'md',
        loading = false,
        disabled = false,
        block = false,
        children,
        className = '',
        as = 'button',
        ...props
      },
      ref
    ) => {
      const classNames = useMemo(() => {
        const classes = [
          cls.btn,
          variants[variant],
          sizes[size],
          block && cls.block,
          cls[className],
        ]
          .filter(Boolean)
          .join(' ');

        return classes;
      }, [variant, size, block, className]);

      const isDisabled = disabled || loading;

      const commonProps = {
        className: classNames,
        'aria-disabled': isDisabled,
        ...(isDisabled && { tabIndex: -1 }),
      };

      if (as === 'a') {
        const { href, ...rest } = props as AnchorProps;

        return (
          <a
            href={isDisabled ? undefined : href}
            {...rest}
            {...commonProps}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }

      const { ...rest } = props as ButtonProps;

      return (
        <button
          {...rest}
          {...commonProps}
          disabled={isDisabled}
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
        >
          {children}
        </button>
      );
    }
  )
);
