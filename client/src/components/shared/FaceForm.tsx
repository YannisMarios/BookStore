import {
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import * as React from 'react';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  faceImage: {
    color: theme.palette.primary.light,
  },
  imageSize: {
    width: '250px',
    height: '318px',
  },
}));

interface FormProps {
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

export const FaceForm: React.FunctionComponent<FormProps> = ({ saveFace }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState('');

  const urlCreator = URL;

  const handleCapture = ({ target }: any) => {
    setSelectedFile(target.files[0]);
    const imageUrl = urlCreator.createObjectURL(target.files[0]);
    setImageSrc(imageUrl);
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {selectedFile && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt="" className={classes.imageSize} />
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          <label style={{ marginTop: '1rem' }}>
            {selectedFile ? selectedFile?.name : 'Select Image'}
          </label>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          <input
            accept="image/jpeg"
            className={classes.input}
            id="faceImage"
            type="file"
            onChange={handleCapture}
          />
          <Tooltip title="Select Image">
            <label htmlFor="faceImage">
              <IconButton
                className={classes.faceImage}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
