import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react';
import cls from './flex.module.css';
import { clsx } from '@/shared/lib/classnames';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'nowrap' | 'wrap';

const justifyClasses: RecordString<FlexJustify> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};

const alignClasses: RecordString<FlexAlign> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
};

const directionClasses: RecordString<FlexDirection> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const wrapClasses: RecordString<FlexWrap> = {
  wrap: cls.wrap,
  nowrap: cls.nowrap,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?: FlexDirection;
  wrap?: FlexWrap;
  gap?: number;
  block?: boolean;
}

export const Flex = ({
  className,
  children,
  justify = 'start',
  align = 'center',
  direction = 'row',
  wrap = 'nowrap',
  gap = 0,
  block = false,
  ...rest
}: FlexProps) => {
  const classes = useMemo(() => {
    const args = [
      cls.flex,
      className,
      justifyClasses[justify],
      alignClasses[align],
      directionClasses[direction],
      wrapClasses[wrap],
      block && cls.block,
    ];

    return clsx(...args);
  }, [className, justify, align, direction, wrap, block]);

  return (
    <div className={classes} style={{ gap: gap }} {...rest}>
      {children}
    </div>
  );
};
