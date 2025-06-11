import {ICompanyInputValues, IFilingInputValues} from './types';
import {FormikErrors} from 'formik';

export const CompanyValidation = (values: ICompanyInputValues): any => {
  const errors: FormikErrors<ICompanyInputValues> = {};

  // name validation
  if (!values.name) {
    errors.name = 'This field is required';
  }

  if (!values.reference_id) {
    errors.reference_id = 'This field is required';
  }
  if (!values.isin) {
    errors.isin = 'This field is required';
  }

  if (!values.currencyid) {
    errors.currencyid = 'This field is required';
  }
  if (!values.sectorid) {
    errors.sectorid = 'This field is required';
  }

  if (!values.country) {
    errors.country = 'This field is required';
  }
  return errors;
};

export const FilingValidation = (values: IFilingInputValues): any => {
  const errors: FormikErrors<IFilingInputValues> = {};

  // name validation
  if (!values.file) {
    errors.file = 'This field is required';
  }

  if (!values.term) {
    errors.term = 'This field is required';
  }
  if (!values.period) {
    errors.period = 'This field is required';
  }

  if (!values.quarterly) {
    errors.quarterly = 'This field is required';
  }

  return errors;
};
