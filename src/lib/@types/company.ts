export interface ICompany {
  id?: number;
}

export interface ICompanyCreate {
  name: string;
  reference_number: string;
  isin: string;
  currency: string;
  sector: Sector;
  country: Country;
}

enum Sector {
  SECTOR1 = 'SECTOR1',
  SECTOR2 = 'SECTOR2',
}

enum Country {
  INDIA = 'INDIA',
  USA = 'USA',
  UK = 'UK',
}
