import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ButtonSearch,
  FormInput,
  FormSearch,
  Searchbardiv,
} from './Searchbar.styled';

import React from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      toast.info('Введіть свій запит, будь ласка!');
      return;
    }
    onSubmit(value);
    reset();
  };

  const reset = () => setValue('');

  return (
    <Searchbardiv>
      <FormSearch onSubmit={handleSubmit}>
        <FormInput
          type="text"
          onChange={handleChange}
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <ButtonSearch type="submit">
          <span>Search</span>
        </ButtonSearch>
      </FormSearch>
    </Searchbardiv>
  );
};
export default Searchbar;
