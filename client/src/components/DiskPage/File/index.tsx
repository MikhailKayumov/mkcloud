import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';
import { FileView, MyFile } from 'store/file/types';

import { TableFile } from './TableFile';
import { TileFile } from './TileFile';

import DirIcon from 'assets/img/dir.svg';
import FileIcon from 'assets/img/file.svg';

export const File: React.FC<{ file: MyFile }> = ({ file }): JSX.Element => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const fileView = useSelector(fileSelectors.fileView);

  const icon = useMemo(() => {
    return file.type === 'dir' ? DirIcon : FileIcon;
  }, [file.type]);
  const openDir = useMemo(() => {
    if (file.type === 'dir') {
      return () => push(`${pathname === '/' ? '' : pathname}/${file.id}`);
    }
  }, [file.id, file.type, pathname, push]);

  if (fileView === FileView.TABLE) {
    return <TableFile file={file} icon={icon} openDir={openDir} />;
  } else {
    return (
      <TileFile
        file={file}
        icon={icon}
        isBig={fileView === FileView.BIG_TILE}
        openDir={openDir}
      />
    );
  }
};
