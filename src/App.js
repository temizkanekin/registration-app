import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Toolbar from './components/Toolbar/Toolbar'
import RegistrationSelectionView from './views/RegistrationSelection/RegistrationSelectionView'
import WorkshopView from './views/Workshop/WorkshopView'
import SummaryView from './views/Summary/SummaryView'

function App () {
  return (
    <Router>
    <div className="header">
      <Toolbar />
    </div>
    <div className="content">
      <Switch>
        <Redirect from="/" to="registration-selection-view" exact/>
          <Route path="/registration-selection-view" component={RegistrationSelectionView} exact />
          <Route path="/workshop-view" component={WorkshopView} exact />
          <Route path="/registration-summary" component={SummaryView} exact />
          <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
    </Router>
  )
}

export default App;
