import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { FileView } from 'store/file/types';
import { fileActions, fileSelectors } from 'store/file';

import View1 from 'assets/img/view1.svg';
import View2 from 'assets/img/view2.svg';
import View3 from 'assets/img/view3.svg';

type ViewBtn = {
  value: FileView;
  label: React.ReactElement;
};

const btns: ViewBtn[] = [
  { value: FileView.BIG_TILE, label: <img src={View1} alt="" /> },
  { value: FileView.TILE, label: <img src={View2} alt="" /> },
  { value: FileView.TABLE, label: <img src={View3} alt="" /> }
];

export const ViewBtns: React.FC = React.memo((): JSX.Element => {
  const dispatch = useDispatch();
  const fileView = useSelector(fileSelectors.fileView);

  const onSetView = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    dispatch(fileActions.setView(+target.value as unknown as FileView));
  };

  return (
    <>
      {btns.map(({ value, label }) => {
        return (
          <button
            key={value}
            className={`type-view-btn${fileView === value ? ' active' : ''}`}
            value={value}
            onClick={onSetView}
          >
            {label}
          </button>
        );
      })}
    </>
  );
});
