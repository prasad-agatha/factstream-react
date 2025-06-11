import React, {FC} from 'react';
// components
import {SectorSelector, CountrySelector, CurrencySelector} from 'src/components/lookup';
import {ICompanyInputValues} from 'src/lib/types';
// form validation
import {CompanyValidation} from 'src/lib/validation';
// formik
import {useFormik} from 'formik';
// service
import {APIPusher} from 'src/lib/service';
// endpoints
import {COMPANIES} from 'src/lib/constants/endpoints';
// material-ui
import {createStyles, fade, Theme, withStyles} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  InputBase,
  InputLabel,
  FormControl,
  Button,
  Typography,
  FormHelperText,
} from '@material-ui/core';

const FormInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
      borderRadius: 4,
      border: '1px solid #ced4da',
      '&.Mui-error': {
        borderColor: 'red',
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

const initialValues: ICompanyInputValues = {
  companyid: null,
  name: '',
  displayname: '',
  reference_id: '',
  isin: '',
  currencyid: '',
  sectorid: '',
  country: '',
};
interface IformikDefination {
  initialValues: typeof initialValues;
  validateOnChange: boolean;
  validate?: any;
  handleSubmit: () => any;
  handleChange: (data: string) => any;
  values: ICompanyInputValues;
  errors: any;
  resetForm: () => void;
}
interface ICompanyFormProps {
  handleClose: () => void;
  SaveAndFiling: (data: any) => any;
  handleCancel: () => void;
}
const CompanyForm: FC<ICompanyFormProps> = (props) => {
  const {handleClose, SaveAndFiling, handleCancel} = props;
  const [isFiling, setIsFiling] = React.useState(false);
  const formik: IformikDefination = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validate: CompanyValidation,
    onSubmit: (values: ICompanyInputValues) => {
      values.companyid = Math.floor(Math.random() * (10000 + 1));
      values.displayname = values.name;
      // console.log(values);
      APIPusher(COMPANIES, values)
        .then((res) => {
          // console.log(res);
          if (isFiling) {
            SaveAndFiling(res);
          } else {
            handleClose();
            formik.resetForm();
          }
        })
        .catch(() => {
          // console.log(error);
        });
    },
  });

  const handleSaveAndFiling = () => {
    setIsFiling(true);
    formik.handleSubmit();
  };
  // const handleCancel = () => {
  //   handleClose();
  //   formik.resetForm();
  // };

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
        <Grid className="mt-3 mb-2" container>
          <Grid item xs={6}>
            <Box pr={2}>
              <FormControl className="inputForm">
                <InputLabel shrink htmlFor="bootstrap-input">
                  Name of the Company
                </InputLabel>
                <FormInput
                  value={formik.values.name}
                  onChange={formik.handleChange('name')}
                  error={formik.errors.name}
                />
                {formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl className="inputForm">
              <InputLabel shrink htmlFor="bootstrap-input">
                Reference ID
              </InputLabel>
              <FormInput
                value={formik.values.reference_id}
                onChange={formik.handleChange('reference_id')}
                error={formik.errors.reference_id}
              />
              {formik.errors.reference_id ? (
                <FormHelperText error>{formik.errors.reference_id}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>
        <Grid className="mb-2" container>
          <Grid item xs={6}>
            <Box pr={2}>
              <FormControl className="inputForm">
                <InputLabel shrink htmlFor="bootstrap-input">
                  ISIN
                </InputLabel>
                <FormInput
                  value={formik.values.isin}
                  onChange={formik.handleChange('isin')}
                  error={formik.errors.isin}
                />
                {formik.errors.isin ? (
                  <FormHelperText error>{formik.errors.isin}</FormHelperText>
                ) : null}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl className="inputForm">
              {/* <InputLabel shrink htmlFor="bootstrap-input">
                Currency
              </InputLabel> */}
              {/* <FormInput
                value={formik.values.currencyid}
                onChange={formik.handleChange('currencyid')}
                error={formik.errors.currencyid}
              /> */}
              <CurrencySelector
                value={formik.values.currencyid}
                handleSector={formik.handleChange('currencyid')}
                error={formik.errors.currencyid}
              />
              {formik.errors.currencyid ? (
                <FormHelperText error>{formik.errors.currencyid}</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
        </Grid>
        <Grid className="mb-2" container>
          <Grid item xs={6}>
            <Box pr={2}>
              <SectorSelector
                value={formik.values.sectorid}
                handleSector={formik.handleChange('sectorid')}
                error={formik.errors.sectorid}
              />
              {formik.errors.sectorid ? (
                <FormHelperText error>{formik.errors.sectorid}</FormHelperText>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <CountrySelector
              value={formik.values.country}
              handleCountry={formik.handleChange('country')}
              error={formik.errors.country}
            />
            {formik.errors.country ? (
              <FormHelperText error>{formik.errors.country}</FormHelperText>
            ) : null}
          </Grid>
        </Grid>

        <div className="mt-4 mb-4">
          <Grid container>
            <Grid item xs={4}>
              <Button size="small" variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Typography align="right">
                <Button type="submit" size="small" variant="contained" color="primary">
                  Save &amp; Close
                </Button>
                &nbsp; &nbsp;
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleSaveAndFiling}
                >
                  Save &amp; Filing
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </form>
    </>
  );
};
export default CompanyForm;
