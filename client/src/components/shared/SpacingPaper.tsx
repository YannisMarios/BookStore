import { Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    root: (props: Props) => ({
      margin: props.noMargin === true ? theme.spacing(0) : theme.spacing(4),
      padding: props.noPadding === true ? theme.spacing(0) : theme.spacing(4),
      marginBottom: theme.spacing(2),
    }),
  })
);

type Props = {
  /**
   * shildren
   */
  children: React.ReactNode;
  /**
   * zero-margin flag
   */
  noMargin?: boolean;
  /**
   * zero-padding flag
   */
  noPadding?: boolean;
};

/**
 * Paper with spacing
 * @param props IProps
 */
export const SpacingPaper = (props: Props) => {
  const { children } = props;
  const classes = useStyles(props);
  return (
    <Paper className={classes.root} elevation={1} square>
      {children}
    </Paper>
  );
};
