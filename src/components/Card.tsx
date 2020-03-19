import React from 'react';
import { ICountryResponse } from '../models/DataService';

interface IProps {
  info: ICountryResponse;
  key: number;
}
function Card(props: IProps) {
  return (
    <div className="column is-one-third-widescreen is-half-tablet is-full-mobile">
      <div className="card country-info">
        <h3>{props.info.country}</h3>
        <p>
          Total Cases: <span className="number-tag">{props.info.cases}</span>
        </p>
        <p>
          Total Deaths:{' '}
          <span className="number-tag death-tag">{props.info.deaths}</span>
        </p>
        <p>
          Total Recovered:{' '}
          <span className="number-tag recover-tag">{props.info.recovered}</span>
        </p>
        <p>
          Critical: <span className="number-tag">{props.info.critical}</span>
        </p>
        <p>
          Today Cases:{' '}
          <span className="number-tag">{props.info.todayCases}</span>
        </p>
        <p>
          Today Deaths:{' '}
          <span className="number-tag death-tag">{props.info.todayDeaths}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
