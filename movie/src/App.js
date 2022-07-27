import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthUser from './services/AuthUser';
import Auth from './shared/Auth';
import Guest from './shared/Guest';
function App() {
  const { getToken } = AuthUser();
  if (!getToken()) {
    return (
      <Guest />
    );
  }
  return (
    <Auth />
  );
}

export default App;
