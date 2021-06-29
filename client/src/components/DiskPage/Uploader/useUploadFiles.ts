import { useCallback, useMemo } from 'react';
import axios, { Canceler, CancelTokenSource } from 'axios';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';

import { fileSelectors, fileThunks } from 'store/file';

type FileCancelTokenSources = Map<number, CancelTokenSource>;

const fileCancelTokenSources: FileCancelTokenSources = new Map();

export const useUploadFiles = (): ((files: File[]) => void) => {
  const dispatch = useDispatch();

  const currentDir = useSelector(fileSelectors.currentDir);
  const isLoading = useSelector(fileSelectors.isLoading);

  return useCallback(
    (files: File[]) => {
      if (!isLoading) {
        files.forEach((file) => {
          const uploadFileId = Date.now();

          const cancelTokenSource = axios.CancelToken.source();
          fileCancelTokenSources.set(uploadFileId, cancelTokenSource);

          dispatch(
            fileThunks.uploadFile({
              id: uploadFileId,
              file,
              parent: currentDir,
              cancelToken: cancelTokenSource.token
            })
          ).then(() => {
            fileCancelTokenSources.delete(uploadFileId);
          });
        });
      }
    },
    [currentDir, dispatch, isLoading]
  );
};

export const useCancelUploadFiles = (): (() => void) => {
  return () => {
    fileCancelTokenSources.forEach((canceler) => {
      canceler.cancel();
    });
  };
};

export const useCancelUploadFile = (id: number): Canceler | undefined => {
  return useMemo(() => {
    return fileCancelTokenSources.get(id)?.cancel;
  }, [id]);
};
