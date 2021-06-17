import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';

import './styles.scss';
import { File } from '../File';

export const FileList: React.FC = (): JSX.Element => {
  const files = useSelector(fileSelectors.files);

  const list = useMemo(() => {
    return files.map((file) => <File file={file} key={file._id} />);
  }, [files]);

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      {list}
    </div>
  );
};
