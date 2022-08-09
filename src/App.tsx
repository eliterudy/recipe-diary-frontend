import React from 'react';
import './App.css';
import Routes from './components/routes';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './redux/config/configureStore';

function App() {
  return (
    <Provider store={store}>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Routes />
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
