import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import App from './components/App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Offline>
          <Alert
            message="Возникла ошибка, попробуйте перезагрузить страницу"
            description="Восстановите подключение к сети"
            type="error"
            closable
            showIcon="true"
            className="alert-fontsize"
          />
        </Offline>
        <Online>
          <App />
        </Online>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
