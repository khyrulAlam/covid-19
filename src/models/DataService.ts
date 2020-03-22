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
  isBookmark: boolean;
}

export class CountryData<T> {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  critical: number;
  isBookmark: Boolean;
  constructor(serverData: any) {
    this.country = serverData.country ? serverData.country : '';
    this.cases = serverData.cases ? serverData.cases : 0;
    this.todayCases = serverData.todayCases ? serverData.todayCases : 0;
    this.deaths = serverData.deaths ? serverData.deaths : 0;
    this.todayDeaths = serverData.todayDeaths ? serverData.todayDeaths : 0;
    this.recovered = serverData.recovered ? serverData.recovered : 0;
    this.critical = serverData.critical ? serverData.critical : 0;
    this.isBookmark = false;
  }
}

export interface ICountry {
  value: string;
  label: string;
}

export const GetLocalStorageData = (key: string) => {
  let bookmarkCountries: string | null = localStorage.getItem(key);
  if (!bookmarkCountries) bookmarkCountries = '[]';
  let json: string[] = JSON.parse(bookmarkCountries);
  return json;
};

const SetLocalStorageData = (key: string, jsonData: any) => {
  localStorage.setItem(key, JSON.stringify(jsonData));
};

export const AddLocalStorage = (key: string, payload: any) => {
  let prevData = GetLocalStorageData(key);
  prevData.push(payload);
  SetLocalStorageData(key, prevData);
};
export const RemoveLocalStorageData = (key: string, payload: any) => {
  let prevData = GetLocalStorageData(key);
  let index = prevData.indexOf(payload);
  if (index !== -1) prevData.splice(index, 1);
  SetLocalStorageData(key, prevData);
  return prevData;
};
