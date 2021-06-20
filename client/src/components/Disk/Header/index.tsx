import React from 'react';

import { useDispatch } from 'store';
import { fileActions } from 'store/file';
import { FileSort, FileView /*, FileOrder*/ } from 'store/file/types';

import { FlexBox } from 'utils/components/FlexBox';
import { Left } from './Left';
import { Right } from './Right';

type HeaderProps = {
  onUploadFiles: (files: File[]) => void;
};

export const Header: React.FC<HeaderProps> = React.memo(
  ({ onUploadFiles }): JSX.Element => {
    const dispatch = useDispatch();

    const onCreateDir = () => {
      dispatch(fileActions.toggleCreateDirPopupDisplay(true));
    };
    const onBackDir = () => {
      dispatch(fileActions.popFromStack());
    };
    const onFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      onUploadFiles(Array.from(event.target.files || []));
    };
    const onSetSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(fileActions.setSort(event.target.value as FileSort));
    };
    const onSetOrder = () => {
      dispatch(fileActions.setOrder());
    };
    const onSetView = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget as HTMLButtonElement;
      dispatch(fileActions.setView(+target.value as unknown as FileView));
    };

    return (
      <FlexBox justify="space-between" className="disk__header">
        <Left
          onCreateDir={onCreateDir}
          onBackDir={onBackDir}
          onFilesUpload={onFilesUpload}
        />
        <Right
          onSetSort={onSetSort}
          onSetOrder={onSetOrder}
          onSetView={onSetView}
        />
      </FlexBox>
    );
  }
);
