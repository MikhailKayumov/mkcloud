import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { Input } from 'utils/components/Input';
import { useUploadFiles } from '../../Uploader/useUploadFiles';

import backIcon from 'assets/img/back-arrow.png';
import newFolder from 'assets/img/new-folder.png';
import uploadIcon from 'assets/img/upload-file.png';

export const Left: React.FC = (): JSX.Element => {
  const { push, location } = useHistory();
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const uploadFiles = useUploadFiles();
  const currentDir = useSelector(fileSelectors.currentDir);

  const createDir = () => {
    dispatch(fileActions.startCreatingDir());
  };
  const back = () => {
    if (location.pathname !== '/') {
      push(location.pathname.slice(0, location.pathname.lastIndexOf('/')));
    }
  };
  const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(event.target.files || []));
  };
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const searchFile = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') dispatch(fileActions.setSearchValue(inputValue));
  };

  useEffect(() => setInputValue(''), [currentDir, dispatch]);

  return (
    <FlexBox className="disk__toolbar-left" grow={1}>
      <FlexBox className="disk__toolbar-left-btns">
        <button className="button" title="Назад" onClick={back}>
          <img src={backIcon} alt="" />
        </button>
        <button className="button" title="Новая папка" onClick={createDir}>
          <img src={newFolder} alt="" />
        </button>
        <div className="button">
          <label htmlFor="diskUploadInput" title="Загрузить файл">
            <img src={uploadIcon} alt="" />
          </label>
          <input
            type="file"
            id="diskUploadInput"
            onChange={upload}
            multiple={true}
          />
        </div>
      </FlexBox>
      <Input
        value={inputValue}
        placeholder="Поиск файла или папки"
        onChange={changeValue}
        onKeyDown={searchFile}
      />
    </FlexBox>
  );
};
