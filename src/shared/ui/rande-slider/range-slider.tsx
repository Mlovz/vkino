import React, { useCallback, useRef, useMemo, memo } from 'react';
import cls from './range-slider.module.css';
import { clsx } from '@/shared/lib/classnames';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
  formatValue?: (value: number) => string;
  size?: 'small' | 'medium' | 'large';
}

const RangeSlider = memo(
  ({
    min,
    max,
    step = 1,
    value,
    onChange,
    label,
    showValue = true,
    disabled = false,
    className = '',
    formatValue = val => val.toString(),
    size = 'medium',
  }: RangeSliderProps) => {
    const sliderRef = useRef<HTMLInputElement>(null);

    const percentage = useMemo(() => {
      const range = max - min;
      if (range === 0) return 0;
      return ((value - min) / range) * 100;
    }, [value, min, max]);

    const progressStyle = useMemo(
      () => ({
        width: `${percentage}%`,
      }),
      [percentage]
    );

    const thumbStyle = useMemo(
      () => ({
        left: `${percentage}%`,
      }),
      [percentage]
    );

    const parseValue = useMemo(() => {
      return step % 1 === 0 ? parseInt : parseFloat;
    }, [step]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseValue(e.target.value);
        if (newValue !== value) {
          onChange(newValue);
        }
      },
      [onChange, value, parseValue]
    );

    const formattedValue = useMemo(
      () => formatValue(value),
      [formatValue, value]
    );

    return (
      <div
        className={clsx(
          cls.rangeContainer,
          cls.singleSlider,
          cls[size],
          className
        )}
      >
        {label && <label className={cls.label}>{label}</label>}

        <div className={cls.sliderWrapper}>
          <div className={cls.sliderTrack}>
            <div className={cls.sliderProgress} style={progressStyle} />
          </div>

          <input
            ref={sliderRef}
            type='range'
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={cls.rangeInput}
          />

          <div className={cls.thumb} style={thumbStyle} />
        </div>

        {showValue && <div className={cls.valueDisplay}>{formattedValue}</div>}
      </div>
    );
  }
);

export default RangeSlider;
