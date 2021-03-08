import React from 'react';
import { makeStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from '../Layout/Layout';

const useStyle = makeStyles(theme => ({
  spinnerOverlay: {
    height: '60vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
)



const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    const classes = useStyle()
    return isLoading ? (
      <div className={classes.spinnerOverlay}>
        <CircularProgress />
      </div>
    ) : (
        <WrappedComponent {...otherProps} />
      );
  };
  return Spinner;
};

export default WithSpinner;
