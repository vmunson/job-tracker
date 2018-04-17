import React, { Component } from 'react';

import './App.css';
import Auth from './components/Login/Auth';
import Header from './components/Header'
import JobInfo from './components/JobInfo/JobInfo'

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: ''
    }
    this.setSessionState = this.setSessionState.bind(this)
    this.logout = this.logout.bind(this)
    this.protectedViews = this.protectedViews.bind(this)
  }
  setSessionState(token) {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token });
  }
  componentDidMount() {
    const token = localStorage.getItem('token')

    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }
  logout() {
    console.log('logout')
    this.setState({ sessionToken: '' });
    localStorage.removeItem('token');
  }
  protectedViews(){
    if(this.state.sessionToken === null || this.state.sessionToken === ''){
      return (
        <Auth setSessionToken={this.setSessionState}/>
      )
    }
    else{
      return (
        <JobInfo token={this.state.sessionToken}/>
      )
    }
  }
  render() {
    return (
      <div>
        <Header clickLogout={this.logout} token={this.state.sessionToken}/>
        {this.protectedViews()}
      </div>
    );
  }
}


export default App;
