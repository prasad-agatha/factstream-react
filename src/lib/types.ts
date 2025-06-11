export interface ICompanyInputValues {
  companyid: number;
  name: string;
  displayname: string;
  reference_id: string;
  isin: string;
  currencyid: string;
  sectorid: string;
  country: string;
}

export interface IFilingInputValues {
  file: any;
  term: string;
  period: string;
  quarterly: string;
}

export interface ISigninInputValues {
  username: any;
  password: any;
}
