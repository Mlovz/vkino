import { IconType, Row } from '@/shared/ui';
import cls from './movie-search.module.css';
import { useEffect, useRef } from 'react';
import Icon from '@/shared/ui/icon/icon';

export const MovieSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <Row
      align='center'
      gap={10}
      onClick={handleFocus}
      className={cls.input_wrap}
    >
      <Icon type={IconType.SEARCH} />
      <input
        ref={inputRef}
        type='text'
        placeholder='Поиск фильмов...'
        value=''
        // onChange={e => setSearchTerm(e.target.value)}
        className={cls.input}
      />
    </Row>
  );
};
