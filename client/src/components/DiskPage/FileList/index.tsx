import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';

import { File } from '../File';
import { Table } from './Table';
import { Tile } from './Tile';

import './styles.scss';

export const FileList: React.FC = (): JSX.Element => {
  const files = useSelector(fileSelectors.filesAndDirs);
  const isTable = useSelector(fileSelectors.tableView);
  const list = useMemo<React.ReactElement[]>(() => {
    return files.map((file) => (
      <CSSTransition key={file.id} timeout={450} classNames="file-anim">
        <File file={file} />
      </CSSTransition>
    ));
  }, [files]);

  return isTable ? <Table list={list} /> : <Tile list={list} />;
};
