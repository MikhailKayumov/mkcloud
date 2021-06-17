import React, { useCallback, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors, fileThunks } from 'store/file';
import { File as FileType } from 'store/file/types';

import { FlexBox } from 'utils/components/FlexBox';

import { formatFileSize } from 'utils';

import DirIcon from 'assets/img/dir.svg';
import FileIcon from 'assets/img/file.svg';

import './styles.scss';

export const File: React.FC<{ file: FileType }> = ({ file }): JSX.Element => {
  const dispatcher = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);

  const { _id: id, name, size, type, date } = file;

  const isDir = type === 'dir';
  const creatingDate = new Date(date);

  const openDir = () => {
    dispatcher(fileActions.pushToStack(currentDir));
    type === 'dir' && dispatcher(fileActions.setCurrentDir(id));
  };
  const onClickCtrlBtn = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const action = (e.target as HTMLButtonElement).name;
      switch (action) {
        case 'download':
          dispatcher(fileThunks.downloadFile(file));
          break;
        case 'delete':
          dispatcher(fileThunks.deleteFile(file));
          break;
      }
    },
    [dispatcher, file]
  );

  const fileIcon = useMemo(() => {
    return isDir ? DirIcon : FileIcon;
  }, [isDir]);
  const fileSize = useMemo(() => {
    if (isDir) return null;
    return formatFileSize(size);
  }, [size, isDir]);
  const ctrlBtns = useMemo(() => {
    return (
      <>
        {!isDir && (
          <button
            className="button file__btn file__download"
            name="download"
            onClick={onClickCtrlBtn}
          >
            Скачать
          </button>
        )}
        <button
          className="button file__btn file__delete"
          name="delete"
          onClick={onClickCtrlBtn}
        >
          Удалить
        </button>
      </>
    );
  }, [isDir, onClickCtrlBtn]);

  return (
    <div className="file" onClick={openDir}>
      <img src={fileIcon} alt="" className="file__img" />
      <FlexBox
        className="file__name"
        alignItems="center"
        justify="space-between"
      >
        <div>{name}</div>
        <FlexBox>{ctrlBtns}</FlexBox>
      </FlexBox>
      <div className="file__date">{creatingDate.toLocaleDateString()}</div>
      <div className="file__size">{fileSize}</div>
    </div>
  );
};
