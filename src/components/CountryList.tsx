import React from 'react';
import Select from 'react-select';
import CountriesList from '../models/CountriesData.json';
import { ICountry } from '../models/DataService';

interface IState {
  countriesList: ICountry[];
}
interface IProps {
  selectCountryEvent: Function;
  selectCountry: ICountry | null;
}

class CountryList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      countriesList: CountriesList
    };
  }
  countryOnChange = event => {
    this.props.selectCountryEvent(event);
  };
  render() {
    return (
      <React.Fragment>
        <div className="section country-select">
          <div className="container">
            <div className="field">
              <Select
                value={this.props.selectCountry}
                onChange={this.countryOnChange}
                isClearable={true}
                options={this.state.countriesList}
                classNamePrefix="foo"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CountryList;
