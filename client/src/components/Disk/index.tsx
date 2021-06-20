import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';

import { fileActions, fileSelectors, fileThunks } from 'store/file';

import { Header } from './Header';
import { FileList } from './FileList';
import { CreateDirPopup } from './CreateDirPopup';
import { Uploader } from './Uploader';

import './styles.scss';
import { useUploadFiles } from './Uploader/useUploadFiles';

export const Disk: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const uploadFiles = useUploadFiles();
  const currentDir = useSelector(fileSelectors.currentDir);
  const popupShow = useSelector(fileSelectors.popupShow);
  const isLoading = useSelector(fileSelectors.isLoading);
  const searchName = useSelector(fileSelectors.searchValue);

  const [dragEnter, setDragEnter] = useState(false);

  useEffect(() => {
    dispatch(fileThunks.getFiles({ dirId: currentDir, searchName: '' }));
  }, [currentDir, dispatch]);
  useEffect(() => {
    if (searchName.length > 2 || !searchName) {
      dispatch(fileThunks.getFiles({ dirId: currentDir, searchName }));
    }
  }, [currentDir, dispatch, searchName]);

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    uploadFiles(Array.from(e.dataTransfer.files || []));
    setDragEnter(false);
  };

  return dragEnter && !isLoading ? (
    <div
      className="drop-area"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
    >
      Перетащите файлы сюда
    </div>
  ) : (
    <div
      className="disk"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
    >
      <Header />
      <FileList />
      {popupShow && !isLoading ? <CreateDirPopup /> : null}
      <Uploader />
    </div>
  );
};
