import React, { useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useSelector } from 'react-redux';
import { fileSelectors } from 'store/file';

import './styles.scss';
import { File } from '../File';
import { FlexBox } from 'utils/components/FlexBox';
import { Loader } from '../../Loader';

export const FileList: React.FC = (): JSX.Element => {
  const isLoading = useSelector(fileSelectors.isLoading);
  const files = useSelector(fileSelectors.filesAndDirs);

  const list = useMemo(() => {
    return files.map((file) => (
      <CSSTransition key={file._id} timeout={500} classNames="file">
        <File file={file} />
      </CSSTransition>
    ));
  }, [files]);

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      <TransitionGroup className="filelist__list">
        {isLoading && (
          <CSSTransition appear timeout={500} classNames="loader">
            <Loader />
          </CSSTransition>
        )}
        {!isLoading && !list.length ? (
          <CSSTransition appear timeout={500} classNames="no-files">
            <FlexBox alignItems="center" justify="center" className="no-files">
              Папка пуста
            </FlexBox>
          </CSSTransition>
        ) : null}
        {!isLoading && list.length ? list : null}
      </TransitionGroup>
    </div>
  );
};
