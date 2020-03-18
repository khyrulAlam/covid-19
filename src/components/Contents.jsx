import React from "react";

class Contents extends React.Component {
  render() {
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline is-mobile is-4">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="column is-one-third-widescreen is-half-tablet is-full-mobile"
                >
                  <div className="card country-info">{v}</div>
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
