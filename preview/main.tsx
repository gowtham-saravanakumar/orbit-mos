import {createRoot} from 'react-dom/client';
import MarketingApp from '../components/marketing-app';
import {previewWorkspace} from '../lib/demo';
import '../app/globals.css';

createRoot(document.getElementById('orbit-root')!).render(
  <MarketingApp initial={previewWorkspace()} standalone />
);
