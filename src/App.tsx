import Routes from './routes'
import { BrowserRouter } from 'react-router-dom';

import './app.css'

import { AuthProvider } from './providers/auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
