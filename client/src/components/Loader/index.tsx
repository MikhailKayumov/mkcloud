import React from 'react';
import { FlexBox } from '../../utils/components/FlexBox';

export const Loader: React.FC = () => (
  <FlexBox justify="center" className="content-loader">
    <div className="content-loader__content">
      <div />
      <div />
      <div />
      <div />
    </div>
  </FlexBox>
);
