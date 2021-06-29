import React from 'react';

import { FlexBox } from 'utils/components/FlexBox';
import { Left } from './Left';
import { Right } from './Right';

export const CtrlPanel: React.FC = (): JSX.Element => {
  return (
    <FlexBox justify="space-between" className="disk__header">
      <Left />
      <Right />
    </FlexBox>
  );
};
