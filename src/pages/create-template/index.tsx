import React, {FC} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
// Data Table
import {TemplatesTable} from 'src/components/tables';
import {Link} from 'react-router-dom';
// material ui
import {Grid, Box, Button} from '@material-ui/core';
// components
import {AddCircle} from '@material-ui/icons';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      background: 'transparent',
      zIndex: 0,
      color: '#000',
      boxShadow: 'none',
    },
    companyHeading: {
      fontSize: '24px',
      fontWeight: 500,
    },
    tab: {
      border: '1px solid #89AFF0',
      borderRadius: '4px 4px 0 0',
      color: '#89AFF0',
      margin: '0 2px',
    },
    styledButton: {
      color: '#ffffff',
      border: '1px solid #89AFF0',
      backgroundColor: '#89AFF0',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#89AFF0',
      },
    },
  })
);

const createTemplate: FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className="pt-3 pb-3">
        <Grid className="contentBox">
          <Box display="flex">
            <Box>
              <Button
                variant="contained"
                className={classes.styledButton}
                style={{textTransform: 'none', marginRight: '20px'}}
                // onClick={handleClickOpen}
              >
                Custom Template
              </Button>
              <Button
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #76A9E2',
                  color: '#0A376C',
                  fontSize: '14px',
                  textTransform: 'none',
                  fontWeight: 400,
                }}
                className={classes.styledButton}
                // onClick={handleClickOpen}
              >
                Enterprise Template
              </Button>
            </Box>
            <Box ml="auto">
              <Link to="/create-template/create">
                <Button variant="contained" className={classes.styledButton}>
                  <AddCircle /> &nbsp; Create new
                </Button>
              </Link>
            </Box>
          </Box>
          <div className="mt-4">
            <TemplatesTable />
          </div>
        </Grid>
      </div>
    </>
  );
};

export default createTemplate;
