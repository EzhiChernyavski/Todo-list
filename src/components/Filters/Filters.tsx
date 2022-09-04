import React, { Dispatch } from 'react';
import style from './Fiters.module.css';

interface FilterProps {
  setFilter: Dispatch<string>
}

const Filters: React.FC<FilterProps> = ({ setFilter }) => {
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  return (
    <>
      <div className={style.filter}>
        <input
          className={style.radioButton}
          type='radio'
          name='filter'
          id='all'
          value='all'
          onChange={handleName}
        />
        <label htmlFor='all'>All</label>
      </div>
      <div className={style.filter}>
        <input
          className={style.radioButton}
          type='radio'
          name='filter'
          id='favorite'
          value='favorite'
          onChange={handleName}
        />
        <label htmlFor='favorite'>Favorite</label>
      </div>
      <div className={style.filter}>
        <input
          className={style.radioButton}
          type='radio'
          name='filter'
          id='inWork'
          value='inWork'
          onChange={handleName}
        />
        <label htmlFor='inWork'>In work</label>
      </div>
      <div className={style.filter}>
        <input
          className={style.radioButton}
          type='radio'
          name='filter'
          id='completed'
          value='completed'
          onChange={handleName}
        />
        <label htmlFor='completed'>Completed</label>
      </div>
    </>
  );
};

export default Filters;