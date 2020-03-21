import React from 'react';
import { IAllInformationData, IAllInformation } from '../models/DataService';
import { API } from '../config';

class Header extends React.Component<{}, IAllInformationData> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.GetAllInformation();
  }
  GetAllInformation = async () => {
    let response: IAllInformationData = await (
      await fetch(API.CONVID_API_ALL)
    ).json();
    let result = new IAllInformation(response);
    this.setState({ ...result });
  };
  render() {
    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <div className="tags has-addons is-right">
              <span className="tag">Last Update</span>
              <span className="tag primary-bg">{this.state.updated}</span>
            </div>
            <nav className="level">
              <div className="level-item has-text-centered card">
                <div>
                  <p className="heading">Total Cases</p>
                  <p className="title">
                    {this.state.cases?.toLocaleString('en-US')}
                  </p>
                </div>
              </div>
              <div className="level-item has-text-centered card">
                <div>
                  <p className="heading">Total Deaths</p>
                  <p className="title">
                    {this.state.deaths?.toLocaleString('en-US')}
                  </p>
                </div>
              </div>
              <div className="level-item has-text-centered card">
                <div>
                  <p className="heading">Total Recovery</p>
                  <p className="title">
                    {this.state.recovered?.toLocaleString('en-US')}
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Header;
