import React, { useCallback, useRef, useMemo, memo } from 'react';
import cls from './range-slider.module.css';
import { clsx } from '@/shared/lib/classnames';

type Size = 'small' | 'medium' | 'large';

interface DualRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  valueMin: number;
  valueMax: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  label?: string;
  showValues?: boolean;
  disabled?: boolean;
  className?: string;
  formatValue?: (value: number) => string;
  size?: Size;
  separator?: string;
}

const DualRangeSlider = memo(
  ({
    min,
    max,
    step = 1,
    valueMin,
    valueMax,
    onMinChange,
    onMaxChange,
    label,
    showValues = true,
    disabled = false,
    className = '',
    formatValue = val => val.toString(),
    size = 'medium',
    separator = ' - ',
  }: DualRangeSliderProps) => {
    const minSliderRef = useRef<HTMLInputElement>(null);
    const maxSliderRef = useRef<HTMLInputElement>(null);

    const { minPercentage, maxPercentage } = useMemo(() => {
      const range = max - min;
      if (range === 0) return { minPercentage: 0, maxPercentage: 0 };

      return {
        minPercentage: ((valueMin - min) / range) * 100,
        maxPercentage: ((valueMax - min) / range) * 100,
      };
    }, [valueMin, valueMax, min, max]);

    const progressStyle = useMemo(
      () => ({
        left: `${minPercentage}%`,
        width: `${maxPercentage - minPercentage}%`,
      }),
      [minPercentage, maxPercentage]
    );

    const minThumbStyle = useMemo(
      () => ({
        left: `${minPercentage}%`,
      }),
      [minPercentage]
    );

    const maxThumbStyle = useMemo(
      () => ({
        left: `${maxPercentage}%`,
      }),
      [maxPercentage]
    );

    const parseValue = useMemo(() => {
      return step % 1 === 0 ? parseInt : parseFloat;
    }, [step]);

    const handleMinChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseValue(e.target.value);

        if (newValue !== valueMin && newValue <= valueMax) {
          onMinChange(newValue);
        }
      },
      [onMinChange, valueMin, valueMax, parseValue]
    );

    const handleMaxChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseValue(e.target.value);

        if (newValue !== valueMax && newValue >= valueMin) {
          onMaxChange(newValue);
        }
      },
      [onMaxChange, valueMax, valueMin, parseValue]
    );

    const formattedValues = useMemo(
      () => ({
        min: formatValue(valueMin),
        max: formatValue(valueMax),
      }),
      [formatValue, valueMin, valueMax]
    );

    return (
      <div
        className={clsx(
          cls.rangeContainer,
          cls.dualSlider,
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
            ref={minSliderRef}
            type='range'
            min={min}
            max={max}
            step={step}
            value={valueMin}
            onChange={handleMinChange}
            disabled={disabled}
            className={`${cls.rangeInput} ${cls.minInput}`}
          />

          <input
            ref={maxSliderRef}
            type='range'
            min={min}
            max={max}
            step={step}
            value={valueMax}
            onChange={handleMaxChange}
            disabled={disabled}
            className={`${cls.rangeInput} ${cls.maxInput}`}
          />

          <div
            className={clsx(cls.thumb, cls.minThumb)}
            style={minThumbStyle}
          />

          <div
            className={clsx(cls.thumb, cls.maxThumb)}
            style={maxThumbStyle}
          />
        </div>

        {showValues && (
          <div className={cls.valueDisplay}>
            {formattedValues.min}
            {separator}
            {formattedValues.max}
          </div>
        )}
      </div>
    );
  }
);

export default DualRangeSlider;
