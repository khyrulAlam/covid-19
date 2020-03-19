import React from "react";
import { ICountryResponse } from "../models/DataService";

interface IState {
  data: ICountryResponse[];
}

class Contents extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.fetchCountry();
  }
  fetchCountry = async () => {
    let response: ICountryResponse[] = await (
      await fetch("https://corona.lmao.ninja/countries ")
    ).json();
    this.setState({ data: response });
  };
  render() {
    return (
      <React.Fragment>
        <section className="section country-data">
          <div className="container">
            <div className="columns is-multiline is-mobile is-4">
              {this.state.data.map((d, i) => (
                <div
                  key={i}
                  className="column is-one-third-widescreen is-half-tablet is-full-mobile"
                >
                  <div className="card country-info">
                    <h3>{d.country}</h3>
                    <p>Total Cases: {d.cases}</p>
                    <p>Total Deaths: {d.deaths}</p>
                    <p>Total Recovered: {d.recovered}</p>
                    <p>Critical: {d.critical}</p>
                    <p>Today Cases: {d.todayCases}</p>
                    <p>Today Deaths: {d.todayDeaths}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Contents;
