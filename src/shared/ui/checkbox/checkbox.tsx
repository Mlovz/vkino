import React from 'react';
import styles from './checkbox.module.css';

type CheckboxSize = 'small' | 'medium' | 'large';

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  className?: string;
}

const Checkbox = ({
  id,
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'medium',
  className = '',
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${styles.checkboxContainer} ${styles[size]} ${className}`}>
      <input
        type='checkbox'
        id={checkboxId}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.hiddenCheckbox}
      />
      <label htmlFor={checkboxId} className={styles.checkboxLabel}>
        <div
          className={`${styles.customCheckbox} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}
        >
          {checked && (
            <svg
              className={styles.checkmark}
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                fill='currentColor'
              />
            </svg>
          )}
        </div>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
