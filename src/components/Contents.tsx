import React from 'react';
import { API } from '../config';
import {
  ICountryResponse,
  ICountry,
  CountryData,
  GetLocalStorageData
} from '../models/DataService';
import CountryList from './CountryList';
import Card from './Card';
import ErrorNotification from './ErrorNotification';

interface IState {
  viewData: ICountryResponse[];
  responseData: ICountryResponse[];
  selectCountry: ICountry | null;
  errorMessage: string;
  isError: boolean;
}

class Contents extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      viewData: [],
      responseData: [],
      selectCountry: null,
      errorMessage: '',
      isError: false
    };
  }
  componentDidMount() {
    this.fetchCountry();
  }
  /*
   * fetch from api **
   */
  fetchCountry = async () => {
    let response: ICountryResponse[] = await (
      await fetch(API.CONVID_API_COUNTRIES)
    ).json();
    let finalData: ICountryResponse[] = this.checkBookmarkCountries(response);
    this.setState({ responseData: response, viewData: finalData });
  };
  /*
   * Check bookmark **
   */

  checkBookmarkCountries = (response: ICountryResponse[]) => {
    let bookmarkCountries: string[] = GetLocalStorageData(API.BOOKMARK_KEY);
    let finalData: ICountryResponse[] = [];
    response.forEach(v => {
      let data: any = new CountryData(v);
      if (!(bookmarkCountries.indexOf(data.country) !== -1)) {
        finalData.push(data);
      } else {
        data.isBookmark = true;
        finalData.unshift(data);
      }
    });
    return finalData;
  };

  /*
   * select country from dropdown **
   */
  selectCountryEvent = (selectValue: ICountry | null) => {
    this.setState({ selectCountry: selectValue });
    //if doesn't select any country
    if (!selectValue) {
      let finalData = this.checkBookmarkCountries(this.state.responseData);
      this.setState({
        viewData: finalData,
        isError: false
      });
      return;
    }
    console.log('what the hell ==== !!!');
    // find select country info from response data
    let findCountryData:
      | ICountryResponse
      | undefined = this.state.responseData.find(
      c => c.country === selectValue.label
    );

    // if nothing find from response data
    if (!findCountryData)
      return this.setState({
        isError: true,
        errorMessage: 'No matching records found'
      });

    //if find desire country value
    let finalData = this.checkBookmarkCountries([findCountryData]);
    this.setState({ viewData: finalData, isError: false });
  };
  /*
   * Clear Error Message **
   */
  clearErrorMessage = () => {
    let finalData = this.checkBookmarkCountries(this.state.responseData);
    this.setState({
      selectCountry: null,
      isError: false,
      viewData: finalData
    });
  };
  render() {
    return (
      <React.Fragment>
        <CountryList
          selectCountryEvent={this.selectCountryEvent}
          selectCountry={this.state.selectCountry}
        />
        <section className="section country-data">
          <div className="container">
            {this.state.isError ? (
              <ErrorNotification
                errorMessage={this.state.errorMessage}
                clearErrorMessage={this.clearErrorMessage}
              />
            ) : (
              <div className="columns is-multiline is-mobile is-4">
                {this.state.viewData.map((info, index) => (
                  <Card info={info} key={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Contents;
