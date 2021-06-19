import React, { useMemo } from 'react';
import { CancelTokenSource } from 'axios';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { UploaderFile } from './UploaderFile';

import './styles.scss';

export const Uploader: React.FC<{
  filesCancelers: { id: number; source: CancelTokenSource }[];
}> = React.memo(({ filesCancelers }): JSX.Element | null => {
  const isFilesUploading = useSelector(fileSelectors.isFilesUploading);
  const files = useSelector(fileSelectors.uploadFiles);

  const filesElements = useMemo(() => {
    return files.map((file) => (
      <UploaderFile
        key={`${file.id}_${file.name}`}
        fileId={file.id}
        canceler={
          filesCancelers.find((canceler) => canceler.id === file.id)?.source
            .cancel
        }
      />
    ));
  }, [files, filesCancelers]);

  if (!isFilesUploading) return null;

  const onClick = () => {
    filesCancelers.forEach((canceler) => canceler.source.cancel());
  };

  return (
    <div className="uploader">
      <FlexBox
        className="uploader__header"
        alignItems="center"
        justify="space-between"
      >
        <div className="uploader__title">Загрузка файлов</div>
        <button className="uploader__close" onClick={onClick}>
          &times;
        </button>
      </FlexBox>
      {filesElements}
    </div>
  );
});
