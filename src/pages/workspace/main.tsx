import React from 'react';
import ReactDOM from 'react-dom/client';

import Workspace from '@p/workspace/Workspace.tsx';
import '@global/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Workspace />
  </React.StrictMode>
);
