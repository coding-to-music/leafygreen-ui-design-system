import React from 'react';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { getCommonCellStyles } from './styles';
import { useFontSizeContext } from './FontSizeContext';
import { useDarkModeContext } from './DarkModeContext';
import { palette } from '@leafygreen-ui/palette';

export const tdInnerDiv = createDataProp('td-inner-div');

interface HeaderCellProps
  extends HTMLElementProps<'th', HTMLTableHeaderCellElement> {
  isHeader: true;
  isDisabled?: boolean;
}

interface TableCellProps extends HTMLElementProps<'td', HTMLTableCellElement> {
  isDisabled?: boolean;
  isHeader?: false;
}

type CellProps = HeaderCellProps | TableCellProps;

const baseStyles = css`
  line-height: 20px;
  position: relative;
`;

const thStyles = css`
  font-weight: 600;
`;

const lightModeThStyles = css`
  border-right: 3px solid ${palette.gray.light2};
  background-color: ${palette.gray.light3};
`;

const darkModeThStyles = css`
  border-right: 3px solid ${palette.gray.dark1};
  background-color: ${palette.gray.dark2};
`;

const innerDivStyles = css`
  display: flex;
  align-items: center;
`;

const lightModeDisabledHeaderStyles = css`
  border-top: 1px solid ${palette.gray.light3};
  border-bottom: 1px solid ${palette.gray.light3};
  color: ${palette.black};
  cursor: auto;
`;

const darkModeDisabledHeaderStyles = css`
  color: ${palette.white};
  cursor: auto;
`;

export type CellElement = React.ReactComponentElement<typeof Cell>;
const Cell = React.forwardRef(
  (
    { children, className, isHeader = false, isDisabled, ...rest }: CellProps,
    ref: React.Ref<any>,
  ) => {
    const Root = isHeader ? 'th' : 'td';

    const baseFontSize = useFontSizeContext();
    const darkMode = useDarkModeContext();

    const props: Partial<CellProps> = {
      ref,
      className: cx(
        getCommonCellStyles(baseFontSize, darkMode),
        baseStyles,
        {
          [thStyles]: isHeader,
          [lightModeThStyles]: isHeader && !darkMode,
          [darkModeThStyles]: isHeader && darkMode,
          [lightModeDisabledHeaderStyles]: isHeader && isDisabled && !darkMode,
          [darkModeDisabledHeaderStyles]: isHeader && isDisabled && darkMode,
        },
        className,
      ),
    };

    if (isHeader) {
      props.scope = 'row';
      props.role = 'rowheader';
    }

    return (
      <Root {...props} {...rest}>
        <div className={innerDivStyles} {...tdInnerDiv.prop}>
          <span
            className={css`
              display: flex;
            `}
          >
            {children}
          </span>
        </div>
      </Root>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
