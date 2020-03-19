export interface IAllInformationData {
  cases?: number;
  deaths?: number;
  recovered?: number;
  updated?: any;
}

export class IAllInformation<T> {
  cases?: number;
  deaths?: number;
  recovered?: number;
  updated: any;
  constructor(serverData: any) {
    this.cases = serverData.cases ? serverData.cases : 0;
    this.deaths = serverData.deaths ? serverData.deaths : 0;
    this.recovered = serverData.recovered ? serverData.recovered : 0;
    this.updated = serverData.updated
      ? new Date(serverData.updated).toLocaleString()
      : 0;
  }
}

export interface ICountryResponse {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  critical: number;
}

export interface ICountry {
  value: string;
  label: string;
}
