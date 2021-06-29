import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';

import { fileActions, fileSelectors, fileThunks } from 'store/file';

import { DragAndDropFiles } from '../DragAndDropFiles';
import { Toolbar } from '../Toolbar';
import { FileList } from '../FileList';
import { CreateDirPopup } from '../CreateDirPopup/';
import { Uploader } from '../Uploader';
import { UserInfo } from '../UserInfo';

export const Disk: React.FC = (): JSX.Element => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const like = useSelector(fileSelectors.searchValue);
  const isLoading = useSelector(fileSelectors.isLoading);
  const creatingDir = useSelector(fileSelectors.creatingDir);

  useEffect(() => {
    const parent = pathname.slice(pathname.lastIndexOf('/') + 1);
    dispatch(fileThunks.getFiles({ parent, like })).then((data) => {
      if (data.meta.requestStatus === 'rejected') {
        // eslint-disable-next-line no-console
        console.error(data);
      } else {
        dispatch(fileActions.setCurrentDir(parent));
      }
    });
  }, [dispatch, pathname, like]);

  return (
    <DragAndDropFiles disabled={isLoading}>
      <UserInfo />
      <Toolbar />
      <FileList />
      <CreateDirPopup show={creatingDir} />
      <Uploader />
    </DragAndDropFiles>
  );
};
