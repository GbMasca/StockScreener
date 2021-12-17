import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import NewSearch from "./NewSearch";
import Comparables from "./Comparables";
import DCF from "./DCF";
import CompanyDetail from "./CompanyDetail";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route exact path={"/"} element={<Landing />} />
              <Route exact path={"/dash"} element={<Dashboard />} />
              <Route exact path={"/dash/new"} element={<NewSearch edit={false}/>} />
              <Route exact path={"/dash/edit"} element={<NewSearch edit={true}/>}/>
              <Route exact path={"/dash/comparables"} element={<Comparables />}/>
              <Route exact path={"/dash/dcf/:company"} element={<DCF />}/>
              <Route exact path={"/dash/detail/:company"} element={<CompanyDetail />}/>
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
