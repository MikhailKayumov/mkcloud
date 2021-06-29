import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors } from 'store/file';
import { FileOrder, FileSort, FileView } from 'store/file/types';

import { FlexBox } from 'utils/components/FlexBox';

import OrderIcon from 'assets/img/orderIcon.svg';
import View1 from 'assets/img/view1.svg';
import View2 from 'assets/img/view2.svg';
import View3 from 'assets/img/view3.svg';

export const Right: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const sortBy = useSelector(fileSelectors.sortBy);
  const orderBy = useSelector(fileSelectors.orderBy);
  const fileView = useSelector(fileSelectors.fileView);

  const onSetSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(fileActions.setSort(event.target.value as FileSort));
  };
  const onSetOrder = () => {
    dispatch(fileActions.setOrder());
  };

  const selectOptions = useMemo(() => {
    const options: { value: FileSort; label: string }[] = [
      { value: FileSort.NAME, label: 'По имени' },
      { value: FileSort.TYPE, label: 'По типу' },
      { value: FileSort.DATE, label: 'По дате' }
    ];
    return options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ));
  }, []);
  const filesViewBtns = useMemo(() => {
    const onSetView = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget as HTMLButtonElement;
      dispatch(fileActions.setView(+target.value as unknown as FileView));
    };

    const btns: { value: FileView; label: React.ReactElement }[] = [
      { value: FileView.BIG_TILE, label: <img src={View1} alt="" /> },
      { value: FileView.TILE, label: <img src={View2} alt="" /> },
      { value: FileView.TABLE, label: <img src={View3} alt="" /> }
    ];

    return btns.map(({ value, label }) => {
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
    });
  }, [dispatch, fileView]);

  return (
    <FlexBox alignItems="center" className="disk__header-right">
      <button
        className={`order-btn ${orderBy === FileOrder.DESC ? 'desc' : 'asc'}`}
        onClick={onSetOrder}
      >
        <img src={OrderIcon} alt="" />
      </button>
      <select value={sortBy} onChange={onSetSort}>
        {selectOptions}
      </select>
      {filesViewBtns}
    </FlexBox>
  );
};
