import React, { useMemo } from 'react';

import { File as FileType } from 'store/file/types';

import DirIcon from 'assets/img/dir.svg';
import FileIcon from 'assets/img/file.svg';

import './styles.scss';

export const File: React.FC<{ file: FileType }> = ({ file }): JSX.Element => {
  const { name, size, type, date } = file;

  const creatingDate = new Date(date);

  const fileIcon = useMemo(() => (type === 'dir' ? DirIcon : FileIcon), [type]);

  return (
    <div className="file">
      <img src={fileIcon} alt="" className="file__img" />
      <div className="file__name">{name}</div>
      <div className="file__date">{creatingDate.toLocaleDateString()}</div>
      <div className="file__size">{size}</div>
    </div>
  );
};
