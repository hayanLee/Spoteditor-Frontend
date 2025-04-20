import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 배포 환경에서 console.log, warn, error 무력화
if (import.meta.env.MODE === 'production') {
  const methods = ['log', 'warn', 'error', 'debug', 'info', 'trace'] as const;
  type ConsoleMethods = (typeof methods)[number];

  methods.forEach((method) => {
    (console as Record<ConsoleMethods, () => void>)[method] = () => {};
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
