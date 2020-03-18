import React from "react";
import "./App.scss";
import "react-bulma-components/dist/react-bulma-components.min.css";
import Header from "./components/Header";
import Contents from "./components/Contents";
import CountryList from "./components/CountryList";

function App() {
  return (
    <div className="App">
      <Header />
      <CountryList />
      <Contents />
    </div>
  );
}

export default App;
