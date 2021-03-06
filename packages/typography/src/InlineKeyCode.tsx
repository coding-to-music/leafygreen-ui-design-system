import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { codeTypeScaleStyles } from './styles';
import { CommonTypographyProps, Mode } from './types';
import { useUpdatedBaseFontSize } from '.';

/**
 * Inline Key Code
 */
const inlineKeyCode = css`
  font-family: ${fontFamilies.code};
  border: 1px solid;
  border-radius: 3px;
  padding-left: 5px;
  padding-right: 5px;
`;

const inlineKeyCodeColor: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
    border-color: ${palette.gray.dark3};
    background-color: ${palette.white};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
    border-color: ${palette.gray.base};
    background-color: ${palette.gray.dark3};
  `,
};

type InlineKeyCodeProps = HTMLElementProps<'h1'> & CommonTypographyProps;

function InlineKeyCode({
  darkMode,
  children,
  className,
  ...rest
}: InlineKeyCodeProps) {
  const baseFontSize = useUpdatedBaseFontSize();
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <code
      className={cx(
        inlineKeyCode,
        inlineKeyCodeColor[mode],
        codeTypeScaleStyles[baseFontSize],
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  );
}

InlineKeyCode.displayName = 'InlineKeyCode';

export default InlineKeyCode;
