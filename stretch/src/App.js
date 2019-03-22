import React, { Component } from 'react';
import './App.css';
import ProjectsList from './components/projectsList.js';
import ProjectPage from './components/projectPage.js';
import {withRouter,Route} from 'react-router-dom';


class App extends Component {
  componentDidMount() {
    this.props.history.push('/projects');
  }
  render() {

    return (
      <div className="App">
        <Route exact path='/projects' component={ ProjectsList } />
        <Route exact path='/projects/:id' component={ ProjectPage } />
      </div>
    );
  }
}

export default withRouter(App);
