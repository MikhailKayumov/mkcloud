import React from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { fileActions, fileSelectors } from 'store/file';

import { FlexBox } from 'utils/components/FlexBox';
import { ViewBtns } from './ViewBtns';

import OrderIcon from 'assets/img/orderIcon.svg';
import { SortSelector } from './SortSelector';

export const Right: React.FC = React.memo((): JSX.Element => {
  const dispatch = useDispatch();

  const ascOrder = useSelector(fileSelectors.ascOrder);
  const onSetOrder = () => dispatch(fileActions.setOrder());

  return (
    <FlexBox
      alignItems="center"
      className="disk__toolbar-right"
      basis={320}
      shrink={0}
      grow={0}
    >
      <button
        className={`order-btn ${ascOrder ? 'asc' : 'desc'}`}
        onClick={onSetOrder}
      >
        <img src={OrderIcon} alt="" />
      </button>
      <SortSelector />
      <ViewBtns />
    </FlexBox>
  );
});
