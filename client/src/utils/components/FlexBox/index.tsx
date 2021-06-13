import React, {
  ForwardRefExoticComponent,
  PropsWithChildren,
  PropsWithoutRef,
  RefAttributes,
  useMemo,
} from 'react';

import { FlexBoxProps, Style } from './types';

export const FlexBox: ForwardRefExoticComponent<
  PropsWithChildren<PropsWithoutRef<FlexBoxProps>> &
    RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, PropsWithChildren<FlexBoxProps>>(
  (
    {
      direction = 'row',
      justify = 'flex-start',
      alignItems = 'stretch',
      alignContent = 'stretch',
      wrap = 'nowrap',
      grow = 0,
      shrink = 1,
      basis = 'auto',
      children,
      className,
    },
    ref,
  ): JSX.Element => {
    const style = useMemo<Style>(
      () => ({
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems,
        alignContent,
        flex: `${grow} ${shrink} ${basis}`,
      }),
      [alignContent, alignItems, basis, direction, grow, justify, shrink, wrap],
    );

    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  },
);
