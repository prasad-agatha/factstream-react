// Base URLS
export const BASE_PROD = 'https://factstream.vercel.app/';
export const BASE_LOCAL = 'https://factstreamapi.herokuapp.com/';
//export const BACKEND_API = 'https://factstreamapi.herokuapp.com/';
export const BACKEND_API = 'https://factstream.liberomeet.io/';

// export const BACKEND_API_Demo = 'https://fact-stream-api.herokuapp.com/';

// export const AUTH_LOGIN = '/api/auth/login';
export const AUTH_LOGIN = `${BACKEND_API}api/login/`;
export const GET_USER = `${BACKEND_API}api/users/me/`;
export const CREATE_USER = `${BACKEND_API}api/users/`;
export const LOG_OUT = `${BACKEND_API}api/logout/`;

export const COMPANIES = `${BACKEND_API}api/companies/`;
export const FILINGS = `${BACKEND_API}api/filings/`;
export const PERIODS = `${BACKEND_API}api/periods/`;
export const TERMS = `${BACKEND_API}api/terms/`;
export const SECTORS = `${BACKEND_API}api/sectors/`;
export const QUATERLY = `${BACKEND_API}api/quaterlies/`;
export const COUNTRIES = `${BACKEND_API}api/countries/`;
export const MEDIA = `${BACKEND_API}api/media/`;

export const COMPANIES_DETAIL = (company_id: any) => `${COMPANIES}${company_id}`;
export const FILING_DETAIL = (filing_id: any) => `${FILINGS}${filing_id}`;
export const COMPANIES_LIST = (page: any) => `${COMPANIES}?page=${page}`;
export const SEARCH = (keyword: any) => `${COMPANIES}search/?name=${keyword}`;
export const FILING_SEARCH = (keyword: any) => `${FILINGS}search/?companyid=${keyword}`;
export const NORMALISED_VALUES = (documentId: any) =>
  `${BACKEND_API}api/documents/${documentId}/normalised/values/`;
export const NORMALISED_PARSED = (documentId: any) =>
  `${BACKEND_API}api/documents/${documentId}/normalised/parsed/`;
export const NORMALISED_PERIODS = (documentId: any) =>
  `${BACKEND_API}api/documents/${documentId}/normalised/periods/`;
export const TIMESERIES_VALUES = (companyId: any) =>
  `${BACKEND_API}api/companies/${companyId}/timeseries/values/`;
export const TIMESERIES_PARSED = (companyId: any) =>
  `${BACKEND_API}api/companies/${companyId}/timeseries/parsed/`;
export const TIMESERIES_PERIODS = (companyId: any) =>
  `${BACKEND_API}api/companies/${companyId}/timeseries/periods/`;

export const COMPANIESLIST = `${BACKEND_API}api/companieslist/`;
export const COMPANY_DETAIL = (companyId) => `${BACKEND_API}api/companieslist/${companyId}/`;
export const DOCSLIST = (companyId) => `${BACKEND_API}api/companieslist/${companyId}/docs/`;
