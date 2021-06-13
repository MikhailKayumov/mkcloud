import React from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

type AlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'stretch';

export type FlexBoxProps = {
  wrap?: FlexWrap;
  direction?: FlexDirection;
  justify?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  grow?: number;
  shrink?: number;
  basis?: string | number;
  className?: string;
};

export type Style = Pick<
  React.CSSProperties,
  'display' &
    'flex' &
    'flexDirection' &
    'justifyContent' &
    'alignItems' &
    'alignContent' &
    'flexWrap'
>;
