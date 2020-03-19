import React from 'react';
import { ICountryResponse, ICountry } from '../models/DataService';
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
      await fetch('https://corona.lmao.ninja/countries ')
    ).json();
    this.setState({ responseData: response, viewData: response });
  };
  /*
   * select country from dropdown **
   */
  selectCountryEvent = (selectValue: ICountry | null) => {
    this.setState({ selectCountry: selectValue });
    //if doesn't select any country
    if (!selectValue)
      return this.setState({
        viewData: this.state.responseData,
        isError: false
      });

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
    this.setState({ viewData: [findCountryData], isError: false });
  };
  /*
   * Clear Error Message **
   */
  clearErrorMessage = () => {
    this.setState({
      selectCountry: null,
      isError: false,
      viewData: this.state.responseData
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
