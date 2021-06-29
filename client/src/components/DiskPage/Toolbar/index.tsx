import React from 'react';

import { FlexBox } from 'utils/components/FlexBox';
import { Left } from './Left';
import { Right } from './Right';

export const Toolbar: React.FC = (): JSX.Element => {
  return (
    <FlexBox justify="space-between" className="disk__toolbar">
      <Left />
      <Right />
    </FlexBox>
  );
};
