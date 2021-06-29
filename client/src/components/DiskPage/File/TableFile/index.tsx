import React from 'react';
import { Buttons } from '../Buttons';
import { MyFile } from 'store/file/types';
import { formatFileSize } from 'utils';

type TableFileProps = {
  file: MyFile;
  icon: string;
  openDir: (() => void) | undefined;
};

export const TableFile: React.FC<TableFileProps> = React.memo(
  ({ file, icon, openDir }): JSX.Element => {
    const { id, name, date, size, type } = file;

    const creatingDate = new Date(date);
    const fileSize = file.type === 'dir' ? null : formatFileSize(size);

    return (
      <div className="table__row">
        <img src={icon} alt="" className="table__cell-img" />
        <div className="table__cell-name" onClick={openDir}>
          <div className="table__cell-name-title">{name}</div>
          <div className="table__cell-name-btns">
            <Buttons id={id} name={name} type={type} />
          </div>
        </div>
        <div className="table__cell-date">
          {creatingDate.toLocaleDateString()}
        </div>
        <div className="table__cell-size">{fileSize}</div>
      </div>
    );
  }
);
