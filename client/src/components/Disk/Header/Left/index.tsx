import React from 'react';

import { FlexBox } from 'utils/components/FlexBox';

type LeftProps = {
  onCreateDir: () => void;
  onBackDir: () => void;
  onFilesUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Left: React.FC<LeftProps> = ({
  onCreateDir,
  onBackDir,
  onFilesUpload
}): JSX.Element => {
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
    </FlexBox>
  );
};
