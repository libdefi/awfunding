import ReactDOM from 'react-dom/client';
import { mount as mountDevTools } from '@latticexyz/dev-tools';
import { App } from './App';
import { setup } from './mud/setup';
import MUDSetup from './MUDSetup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectPage } from './project/[id]';
import WalletConnection from './WalletConnection';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

const rootElement = document.getElementById('react-root');
if (!rootElement) throw new Error('React root not found');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <WalletConnection>
    <MUDSetup>
      <Router>
        <Routes>
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </MUDSetup>
  </WalletConnection>,
);
