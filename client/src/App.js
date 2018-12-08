import React, { Component } from 'react';
import logo from './spacex-logo.jpg';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launches from './components/launches';
import Launch from './components/launch';
import './App.css';

const client = new ApolloClient({
    uri: '/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <a href="/"><img src={logo} alt="SpaceX" style={{ width: 300, display: 'block', margin: 'auto' }} /></a>
            <Route exact path="/" component= {Launches} />
            <Route exact path="/launch/:flight_number" component= {Launch} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
