import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { Dispatch } from 'react';

type Props = {
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};

export const FullPageSpinner = ({ loading, setLoading }: Props) => {
  return (
    <Backdrop
      style={{ zIndex: 2 }}
      color={'white'}
      open={loading}
      onClick={() => {
        setLoading(false);
      }}
    >
      <CircularProgress color={'inherit'} />
    </Backdrop>
  );
};
