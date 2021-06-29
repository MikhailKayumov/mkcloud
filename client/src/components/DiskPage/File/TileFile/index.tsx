import React from 'react';

import { MyFile } from 'store/file/types';

import { Buttons } from '../Buttons';

type TileFileProps = {
  file: MyFile;
  icon: string;
  isBig: boolean;
  openDir: (() => void) | undefined;
};

export const TileFile: React.FC<TileFileProps> = React.memo(
  ({ file, icon, isBig, openDir }): JSX.Element => {
    const { id, name, type } = file;

    return (
      <div className={`tile${isBig ? ' big' : ''}`} onClick={openDir}>
        <img src={icon} alt="" className="tile__img" />
        <div className="tile__name">{name}</div>
        <div className="tile__btns">
          <Buttons id={id} name={name} type={type} />
        </div>
      </div>
    );
  }
);
