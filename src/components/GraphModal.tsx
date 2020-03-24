import React from 'react';
import { API } from '../config';
var Chart = require('chart.js');

interface IProps {
  openModalWithCountryGraph: Function;
  selectCountry: string;
}
interface IState {
  labels: string[];
  dataSets: {
    cases: string[];
    deaths: string[];
    recovered: string[];
  };
  countryInfo: any | null;
  loading: boolean;
}
class GraphModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      labels: [],
      dataSets: {
        cases: [],
        deaths: [],
        recovered: []
      },
      countryInfo: null,
      loading: true
    };
  }
  componentDidMount() {
    this.componentInit();
  }
  componentInit = async () => {
    await this.countryInfo();
    await this.prepareGraphData();
    this.setState({ loading: false });
  };
  countryInfo = async () => {
    let response = await (
      await fetch(API.CONVID_API_COUNTRIES + this.props.selectCountry)
    ).json();
    let response2 = await (
      await fetch(
        API.CONVID_API_COUNTRIES_HISTORICAL + this.props.selectCountry
      )
    ).json();
    let labels = Object.keys(response2.timeline.cases);
    let cases: string[] = Object.values(response2.timeline.cases);
    let deaths: string[] = Object.values(response2.timeline.deaths);
    let recovered: string[] = Object.values(response2.timeline.recovered);
    this.setState({
      countryInfo: response,
      labels: labels,
      dataSets: {
        cases: cases,
        deaths: deaths,
        recovered: recovered
      }
    });
    return;
  };
  prepareGraphData = async () => {
    var ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.state.labels,
        datasets: [
          {
            label: 'Cases',
            backgroundColor: '#9e9e9e',
            borderColor: '#9e9e9e',
            barPercentage: 0.5,
            barThickness: 6,

            data: this.state.dataSets.cases,
            fill: false
          },
          {
            label: 'Deaths',
            backgroundColor: '#f47183',
            borderColor: '#f47183',
            barPercentage: 0.5,
            barThickness: 6,

            data: this.state.dataSets.deaths,
            fill: false
          },
          {
            label: 'Recovered',
            backgroundColor: '#62a064',
            borderColor: '#62a064',
            barPercentage: 0.5,
            barThickness: 6,

            data: this.state.dataSets.recovered,
            fill: false
          }
        ]
      }
    });
    return;
  };
  render() {
    return (
      <React.Fragment>
        <div className="modal is-active">
          <div className="modal-background"></div>

          {this.state.loading ? (
            <div style={{ position: 'relative' }}>
              <img
                src="https://loading.io/mod/spinner/rosary/index.svg"
                alt="loading"
              />
            </div>
          ) : (
            ''
          )}
          <div
            className="modal-content"
            style={{
              background: '#28293d',
              color: '#f47183',
              border: '12px solid rgba(244, 113, 131, 0.12)'
            }}
          >
            <div style={{ textAlign: 'center', padding: '20px 0 25px 0' }}>
              <img
                src={this.state.countryInfo?.countryInfo.flag}
                alt={this.state.countryInfo?.country}
                width="50"
              />
              <h3>Today Cases - {this.state.countryInfo?.todayCases}</h3>
              <h3>Today Deaths - {this.state.countryInfo?.todayDeaths}</h3>
            </div>
            <canvas id="myChart"></canvas>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => this.props.openModalWithCountryGraph()}
          ></button>
        </div>
      </React.Fragment>
    );
  }
}

export default GraphModal;
