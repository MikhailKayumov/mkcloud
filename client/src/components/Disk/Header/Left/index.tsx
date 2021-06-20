import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { Input } from 'utils/components/Input';
import { useUploadFiles } from '../../Uploader/useUploadFiles';

export const Left: React.FC = React.memo((): JSX.Element => {
  const dispatch = useDispatch();

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentDir = useSelector(fileSelectors.currentDir);
  const searchValue = useSelector(fileSelectors.searchValue);
  const uploadFiles = useUploadFiles();

  const [inputValue, setInputValue] = useState(searchValue);

  const onCreateDir = () => {
    dispatch(fileActions.toggleCreateDirPopupDisplay(true));
  };
  const onBackDir = () => {
    dispatch(fileActions.popFromStack());
  };
  const onFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(event.target.files || []));
  };
  const onSearchFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      searchTimeout.current = null;
      dispatch(fileActions.setSearchValue(event.target.value));
    }, 500);
  };

  useEffect(() => {
    setInputValue('');
    dispatch(fileActions.setSearchValue(''));
  }, [currentDir, dispatch]);

  return (
    <FlexBox alignItems="center" className="disk__header-left">
      <button className="button disk__btn disk__btnBack" onClick={onBackDir}>
        Назад
      </button>
      <button
        className="button disk__btn disk__btnCreate"
        onClick={onCreateDir}
      >
        Создать папку
      </button>
      <div className="disk__upload">
        <label htmlFor="diskUploadInput" className="button disk__upload-label">
          Загрузить файл
        </label>
        <input
          type="file"
          className="disk__upload-input"
          id="diskUploadInput"
          onChange={onFilesUpload}
          multiple={true}
        />
      </div>
      <Input
        value={inputValue}
        placeholder="Поиск файла или папки"
        onChange={onSearchFile}
      />
    </FlexBox>
  );
});
