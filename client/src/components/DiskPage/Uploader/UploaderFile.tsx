import React from 'react';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';
import { ApplicationState } from 'store/types';
import { MyUploadFile } from 'store/file/types';

import { FlexBox } from 'utils/components/FlexBox';

import { useCancelUploadFile } from './useUploadFiles';

import './styles.scss';

export const UploaderFile: React.FC<{
  fileId: number;
}> = React.memo(({ fileId }): JSX.Element | null => {
  const file = useSelector<ApplicationState, MyUploadFile | undefined>(
    (state) => fileSelectors.uploadFile(state, { fileId })
  );
  const canceler = useCancelUploadFile(fileId);

  const onClick = () => canceler && canceler();

  if (!file) return null;
  return (
    <div className="upload-file">
      <FlexBox
        className="upload-file__header"
        justify="space-between"
        alignItems="center"
      >
        <div className="upload-file__name">{file.name}</div>
        <button className="upload-file__remove" onClick={onClick}>
          &times;
        </button>
      </FlexBox>
      <FlexBox
        className="upload-file__progress-bar"
        justify="space-between"
        alignItems="center"
      >
        <div className="upload-file__upload-bar-wrapper">
          <div
            className="upload-file__upload-bar"
            style={{ width: `${file.progress}%` }}
          />
        </div>
        <div className="upload-file__percent">{file.progress}%</div>
      </FlexBox>
    </div>
  );
});
