import React, { Component } from 'react'
import './App.css'

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { LoginContainer } from './LoginComponent'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginContainer />
        <SwaggerUI
            requestInterceptor={window.requestInterceptor}
            url={'/swagger/swagger.json'}
        />
      </div>
    );
  }
}

export default App;
