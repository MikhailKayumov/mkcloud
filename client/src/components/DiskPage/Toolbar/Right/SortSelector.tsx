import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { FileSort } from 'store/file/types';
import { fileActions, fileSelectors } from 'store/file';

type SortOption = {
  value: FileSort;
  label: string;
};

const options: SortOption[] = [
  { value: FileSort.NAME, label: 'По имени' },
  { value: FileSort.TYPE, label: 'По типу' },
  { value: FileSort.DATE, label: 'По дате' }
];

export const SortSelector: React.FC = React.memo((): JSX.Element => {
  const dispatch = useDispatch();
  const sortBy = useSelector(fileSelectors.sortBy);

  const onSetSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(fileActions.setSort(event.target.value as FileSort));
  };

  return (
    <select value={sortBy} onChange={onSetSort}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
