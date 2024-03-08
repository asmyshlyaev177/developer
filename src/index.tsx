import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles.scss';
import App from 'App';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
