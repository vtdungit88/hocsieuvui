import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { startAppUpdateWatcher } from './lib/appUpdate';

startAppUpdateWatcher();

createRoot(document.getElementById('root')!).render(<App />);
