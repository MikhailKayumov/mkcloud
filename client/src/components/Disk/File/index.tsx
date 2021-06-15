import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors } from 'store/file';
import { File as FileType } from 'store/file/types';

import DirIcon from 'assets/img/dir.svg';
import FileIcon from 'assets/img/file.svg';

import './styles.scss';

export const File: React.FC<{ file: FileType }> = ({ file }): JSX.Element => {
  const dispatcher = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);

  const { id, name, size, type, date } = file;

  const creatingDate = new Date(date);

  const fileIcon = useMemo(() => (type === 'dir' ? DirIcon : FileIcon), [type]);

  const openDir = () => {
    dispatcher(fileActions.pushToStack(currentDir));
    type === 'dir' && dispatcher(fileActions.setCurrentDir(id));
  };

  return (
    <div className="file" onClick={openDir}>
      <img src={fileIcon} alt="" className="file__img" />
      <div className="file__name">{name}</div>
      <div className="file__date">{creatingDate.toLocaleDateString()}</div>
      <div className="file__size">{size}</div>
    </div>
  );
};
