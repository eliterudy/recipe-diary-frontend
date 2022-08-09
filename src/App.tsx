import React from 'react';
import './App.css';
import Routes from './components/routes';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/config/configureStore';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
