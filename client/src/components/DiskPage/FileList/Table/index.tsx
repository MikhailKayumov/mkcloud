import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';

import { Loader } from 'components/Loader';
import { Empty } from '../../File/Empty';

export const Table: React.FC<{
  list: React.ReactElement[];
}> = React.memo(({ list }): JSX.Element => {
  const isLoading = useSelector(fileSelectors.isLoading);

  return (
    <div className="file-list table">
      <div className="table__header">
        <div className="table__cell-img" />
        <div className="table__cell-name">Название</div>
        <div className="table__cell-date">Дата</div>
        <div className="table__cell-size">Размер</div>
      </div>
      <Loader show={isLoading} />
      <Empty show={!list.length && !isLoading} />
      <TransitionGroup component={null}>{!isLoading && list}</TransitionGroup>
    </div>
  );
});
