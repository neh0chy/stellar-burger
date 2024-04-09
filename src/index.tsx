import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={}> */}
      <App />
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);
