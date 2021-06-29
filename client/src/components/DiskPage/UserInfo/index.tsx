import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { userSelectors } from 'store/user';

import { formatFileSize } from 'utils';
import { FlexBox } from 'utils/components/FlexBox';

const dasharray = 2 * Math.PI * 26;

export const UserInfo: React.FC = React.memo((): JSX.Element | null => {
  const [dashoffset, setDashoffset] = useState(dasharray);
  const user = useSelector(userSelectors.user);
  const usedSpace = useSelector(userSelectors.usedSpace);

  useEffect(() => {
    if (user) {
      const percent = (usedSpace || 0) / user.diskSpace;
      setDashoffset(dasharray - dasharray * percent);
    }
  }, [usedSpace, user]);

  if (!user) return null;

  return (
    <FlexBox justify="space-between" alignItems="center" className="user-info">
      <FlexBox alignItems="center" className="user-info__left">
        <div className="user-info__avatar" />
        <FlexBox direction="column" className="user-info__name">
          <span>{user.firstname}</span>
          <span>{user.lastname}</span>
        </FlexBox>
      </FlexBox>
      <FlexBox alignItems="center" className="user-info__right">
        <FlexBox
          direction="column"
          alignItems="flex-end"
          className="user-info__space"
        >
          <span>Занято: {formatFileSize(user.usedSpace)}</span>
          <span>Доступно: {formatFileSize(user.diskSpace)}</span>
        </FlexBox>
        <div className="user-info__circle-space">
          <svg width={60} height={60}>
            <circle className="background" cx="50%" cy="50%" r={26} />
            <circle
              className="progress"
              cx="50%"
              cy="50%"
              r={26}
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
            />
          </svg>
        </div>
      </FlexBox>
    </FlexBox>
  );
});
