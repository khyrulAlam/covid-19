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
