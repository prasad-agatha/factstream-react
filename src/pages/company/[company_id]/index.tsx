import React, {FC} from 'react';
// Hooks
import {useRequest} from 'src/lib/hooks';
//endpoints
import {COMPANIES_DETAIL} from 'src/lib/constants/endpoints';
//link
import {Link} from 'react-router-dom';

// components
import {FilingList} from 'src/components/tables';
// material ui
import {
  Grid,
  createStyles,
  makeStyles,
  Typography,
  IconButton,
  Divider,
  Paper,
} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
// router
import {useParams} from 'react-router-dom';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      boxShadow: 'none',
      padding: '8px 20px',
      position: 'relative',
    },
    companyHeading: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '32px',
      paddingLeft: '45px',
    },
    arrowButton: {
      position: 'absolute',
      top: '1px',
      color: '#000',
    },
  })
);

const ListPage: FC = () => {
  const classes = useStyles();
  // const router = useRouter();
  const {company_id} = useParams();

  const {data: company_detail}: any = useRequest({
    url: COMPANIES_DETAIL(company_id),
  });

  if (!company_detail) {
    return <>loading...</>;
  }

  return (
    <>
      <div className="pb-5">
        <Paper className={classes.paper}>
          <Link to="/">
            <a>
              <IconButton aria-label="close" className={classes.arrowButton}>
                <ArrowBack />
              </IconButton>
            </a>
          </Link>
          <Typography variant="h6" className={classes.companyHeading}>
            {company_detail.name} - Filing list
          </Typography>
        </Paper>

        <Divider />
        <div className="mt-3">
          <Grid className="contentBox">
            <div className="mt-3">
              <FilingList datalist={company_detail} />
            </div>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ListPage;
