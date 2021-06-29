import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';
import { FileView } from 'store/file/types';

import { Loader } from 'components/Loader';
import { Empty } from '../../File/Empty';

export const Tile: React.FC<{
  list: React.ReactElement[];
}> = React.memo(({ list }): JSX.Element => {
  const fileView = useSelector(fileSelectors.fileView);
  const isLoading = useSelector(fileSelectors.isLoading);
  const className = `file-list tiles${
    fileView === FileView.BIG_TILE ? ' big' : ''
  }`;

  return (
    <div className={className}>
      <Loader show={isLoading} />
      <Empty show={!list.length && !isLoading} />
      <TransitionGroup component={null}>{!isLoading && list}</TransitionGroup>
    </div>
  );
});
