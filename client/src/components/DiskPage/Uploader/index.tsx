import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { UploaderFile } from './UploaderFile';
import { useCancelUploadFiles } from './useUploadFiles';

import './styles.scss';

export const Uploader: React.FC = React.memo((): JSX.Element | null => {
  const isFilesUploading = useSelector(fileSelectors.isFilesUploading);
  const files = useSelector(fileSelectors.uploadFiles);
  const cancelUploadFiles = useCancelUploadFiles();

  const filesElements = useMemo(() => {
    return files.map((file) => (
      <UploaderFile key={`${file.id}_${file.name}`} fileId={file.id} />
    ));
  }, [files]);

  if (!isFilesUploading) return null;

  return (
    <div className="uploader">
      <FlexBox
        className="uploader__header"
        alignItems="center"
        justify="space-between"
      >
        <div className="uploader__title">Загрузка файлов</div>
        <button className="uploader__close" onClick={cancelUploadFiles}>
          &times;
        </button>
      </FlexBox>
      {filesElements}
    </div>
  );
});
