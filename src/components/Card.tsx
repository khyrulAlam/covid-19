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
  openModalWithCountryGraph: Function;
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
            <h3>
              <span
                className="graph-chart"
                title="Graph"
                onClick={() =>
                  this.props.openModalWithCountryGraph(this.props.info.country)
                }
                style={{ marginRight: '10px', cursor: 'pointer' }}
              >
                <img src="./graph.gif" alt="" width="20px" />
                {/* <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chart-area"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-chart-area fa-w-16 fa-2x"
                  style={{ width: '20px', color: '#9e9e9e' }}
                >
                  <path
                    fill="currentColor"
                    d="M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM372.7 159.5L288 216l-85.3-113.7c-5.1-6.8-15.5-6.3-19.9 1L96 248v104h384l-89.9-187.8c-3.2-6.5-11.4-8.7-17.4-4.7z"
                    className=""
                  ></path>
                </svg> */}
              </span>
              {this.props.info.country}
            </h3>
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
