import React from 'react';
import {
  ICountryResponse,
  AddLocalStorage,
  RemoveLocalStorageData
} from '../models/DataService';
import BookMark from './Bookmark';
import { API } from '../config';

interface IProps {
  info: ICountryResponse;
  key: number;
}
interface IState {
  isBookmark: boolean;
}
class Card extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isBookmark: this.props.info.isBookmark
    };
  }
  UNSAFE_componentWillReceiveProps(prev) {
    if (this.props.info.isBookmark !== prev.info.currentRow) {
      this.setState({ isBookmark: prev.info.isBookmark });
    }
  }
  handleChildEvent = countryName => {
    if (!this.state.isBookmark) {
      AddLocalStorage(API.BOOKMARK_KEY, countryName);
    } else {
      RemoveLocalStorageData(API.BOOKMARK_KEY, countryName);
    }
    this.setState({ isBookmark: !this.state.isBookmark });
  };
  render() {
    return (
      <div className="column is-one-third-widescreen is-half-tablet is-full-mobile">
        <div className="card country-info">
          <div className="card-top">
            <h3>{this.props.info.country}</h3>
            <div className="card-icon">
              <BookMark
                countryName={this.props.info.country}
                isBookmark={this.state.isBookmark}
                handleChildEvent={this.handleChildEvent}
              />
            </div>
          </div>

          <p>
            Total Cases:{' '}
            <span className="number-tag">
              {this.props.info.cases.toLocaleString('en-US')}
            </span>
          </p>
          <p>
            Total Deaths:{' '}
            <span className="number-tag death-tag">
              {this.props.info.deaths.toLocaleString('en-US')}
            </span>
          </p>
          <p>
            Total Recovered:{' '}
            <span className="number-tag recover-tag">
              {this.props.info.recovered.toLocaleString('en-US')}
            </span>
          </p>
          <p>
            Critical:{' '}
            <span className="number-tag">
              {this.props.info.critical.toLocaleString('en-US')}
            </span>
          </p>
          <p>
            Today Cases:{' '}
            <span className="number-tag">
              {this.props.info.todayCases.toLocaleString('en-US')}
            </span>
          </p>
          <p>
            Today Deaths:{' '}
            <span className="number-tag death-tag">
              {this.props.info.todayDeaths.toLocaleString('en-US')}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
