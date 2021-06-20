import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';

import { fileSelectors, fileThunks } from 'store/file';

import { Header } from './Header';
import { Loader } from '../Loader';
import { FileList } from './FileList';
import { CreateDirPopup } from './CreateDirPopup';
import { Uploader } from './Uploader';

import './styles.scss';

type fileCancelTokenSources = Array<{
  id: number;
  source: CancelTokenSource;
}>;

export const Disk: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const currentDir = useSelector(fileSelectors.currentDir);
  const popupShow = useSelector(fileSelectors.popupShow);
  const isLoading = useSelector(fileSelectors.isLoading);

  const fileCancelTokenSources = useRef<fileCancelTokenSources>([]);
  const [dragEnter, setDragEnter] = useState(false);

  useEffect(() => {
    dispatch(fileThunks.getFiles(currentDir));
  }, [currentDir, dispatch]);

  const onUploadFiles = useCallback(
    (files: File[]) => {
      if (!isLoading) {
        files.forEach((file) => {
          const uploadFileId = Date.now();

          const cancelTokenSource = axios.CancelToken.source();
          fileCancelTokenSources.current.push({
            id: uploadFileId,
            source: cancelTokenSource
          });

          dispatch(
            fileThunks.uploadFile({
              id: uploadFileId,
              file,
              parent: currentDir,
              cancelToken: cancelTokenSource.token
            })
          ).then(() => {
            fileCancelTokenSources.current =
              fileCancelTokenSources.current.filter(
                (entity) => entity.id !== uploadFileId
              );
          });
        });
      }
    },
    [currentDir, dispatch, isLoading]
  );

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
    onUploadFiles(Array.from(e.dataTransfer.files || []));
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
      <Header onUploadFiles={onUploadFiles} />
      {isLoading ? <Loader /> : <FileList />}
      {popupShow && !isLoading ? <CreateDirPopup /> : null}
      <Uploader filesCancelers={fileCancelTokenSources.current} />
    </div>
  );
};
