import React from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'reduxjs-toolkit-persist/es/integration/react';
import { persistStore } from 'reduxjs-toolkit-persist';
import { Provider } from 'react-redux';
import { store } from './app/store';
import SuspensePage from './components/Suspensepage/SuspensePage';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from 'react-toast-notifications';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const LazyApp = React.lazy(() => import("./App"));


const container = document.getElementById('root');
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <ToastProvider  placement="top-right" >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Suspense fallback={<SuspensePage />}>
            <LazyApp />
          </React.Suspense>
        </PersistGate>
      </Provider>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
