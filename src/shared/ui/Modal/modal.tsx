import React from 'react';
import cls from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className={cls.backdrop}>
      <div className={cls.modal} onClick={e => e.stopPropagation()}>
        {children}
        {onClose && <button onClick={onClose}>Закрыть</button>}
      </div>
    </div>
  );
};
