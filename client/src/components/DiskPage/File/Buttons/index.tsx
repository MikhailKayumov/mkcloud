import React from 'react';

import { useDispatch } from 'store';
import { fileThunks } from 'store/file';

import download from 'assets/img/download.png';
import remove from 'assets/img/delete.png';

type ButtonsProps = {
  id: string;
  name: string;
  type: string;
};

export const Buttons: React.FC<ButtonsProps> = React.memo(
  ({ id, name, type }): JSX.Element => {
    const dispatch = useDispatch();

    const downloadFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(fileThunks.downloadFile({ id, name }));
    };
    const deleteFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(fileThunks.deleteFile({ id, type }));
    };

    return (
      <>
        {type !== 'dir' && (
          <button
            className="button table__cell-name-btn file__download"
            onClick={downloadFile}
            title="Скачать файл"
          >
            <img src={download} alt="" />
          </button>
        )}
        <button
          className="button table__cell-name-btn file__delete"
          onClick={deleteFile}
          title={`Удалить ${type === 'dir' ? 'папку' : 'файл'}`}
        >
          <img src={remove} alt="" />
        </button>
      </>
    );
  }
);
