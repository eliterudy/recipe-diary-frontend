import React from 'react';
import './App.css';
import Routes from './components/routes';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/config/configureStore';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
