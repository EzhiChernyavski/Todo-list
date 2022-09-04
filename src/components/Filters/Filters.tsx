import React, { Dispatch } from 'react';

interface FilterProps {
  setFilter: Dispatch<string>
}

const Filters: React.FC<FilterProps> = ({ setFilter }) => {
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <label htmlFor='all'>All</label>
      <input
        type='radio'
        name='filter'
        id='all'
        value='all'
        onChange={handleName}
      />
      <label htmlFor='favorite'>Favorite</label>
      <input
        type='radio'
        name='filter'
        id='favorite'
        value='favorite'
        onChange={handleName}
      />
      <label htmlFor='inWork'>In Work</label>
      <input
        type='radio'
        name='filter'
        id='inWork'
        value='inWork'
        onChange={handleName}
      />
      <label htmlFor='completed'>Completed</label>
      <input
        type='radio'
        name='filter'
        id='completed'
        value='completed'
        onChange={handleName}
      />
    </div>
  );
};

export default Filters;