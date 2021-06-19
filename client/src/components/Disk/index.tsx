import React, { useEffect, useRef, useState } from 'react';
import axios, { CancelTokenSource } from 'axios';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';

import { fileActions, fileSelectors, fileThunks } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { FileList } from './FileList';
import { CreateDirPopup } from './CreateDirPopup';
import { Uploader } from './Uploader';

import './styles.scss';

export const Disk: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentDir = useSelector(fileSelectors.currentDir);
  const popupShow = useSelector(fileSelectors.popupShow);
  const fileCancelTokenSources = useRef<
    { id: number; source: CancelTokenSource }[]
  >([]);
  const [dragEnter, setDragEnter] = useState(false);

  useEffect(() => {
    dispatch(fileThunks.getFiles(currentDir));
  }, [currentDir, dispatch]);

  const onUploadFiles = (files: File[]) => {
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
        fileCancelTokenSources.current = fileCancelTokenSources.current.filter(
          (entity) => entity.id !== uploadFileId
        );
      });
    });
  };

  const createDir = () => {
    dispatch(fileActions.toggleCreateDirPopupDisplay(true));
  };
  const backDir = () => {
    dispatch(fileActions.popFromStack());
  };
  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUploadFiles(Array.from(event.target.files || []));
  };
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

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
    >
      <FlexBox alignItems="center" className="disk__btns">
        <button className="button disk__btn disk__btnBack" onClick={backDir}>
          Назад
        </button>
        <button
          className="button disk__btn disk__btnCreate"
          onClick={createDir}
        >
          Создать папку
        </button>
        <div className="disk__upload">
          <label
            htmlFor="diskUploadInput"
            className="button disk__upload-label"
          >
            Загрузить файл
          </label>
          <input
            type="file"
            className="disk__upload-input"
            id="diskUploadInput"
            onChange={fileUpload}
            multiple={true}
          />
        </div>
      </FlexBox>
      <FileList />
      {popupShow ? <CreateDirPopup /> : null}
      <Uploader filesCancelers={fileCancelTokenSources.current} />
    </div>
  ) : (
    <div
      className="drop-area"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
    >
      Перетащите файлы сюда
    </div>
  );
};
