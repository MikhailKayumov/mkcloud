import React from 'react';

import { FlexBox } from 'utils/components/FlexBox';
import { Left } from './Left';
import { Right } from './Right';

export const Header: React.FC = React.memo((): JSX.Element => {
  return (
    <FlexBox justify="space-between" className="disk__header">
      <Left />
      <Right />
    </FlexBox>
  );
});
