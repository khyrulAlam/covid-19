import React from "react";

class CountryList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="field">
            <p className="control has-icons-left">
              <span className="select">
                <select defaultValue={"DEFAULT"}>
                  <option value="DEFAULT">Country</option>
                  <option value="0">Select dropdown</option>
                  <option value="0">With options</option>
                </select>
              </span>
              <span className="icon is-small is-left">
                <i className="fas fa-globe"></i>
              </span>
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CountryList;
