import './App.css';
import '../style/mystyles.scss';
import MainRouter from '../routers/MainRouter';
import { Provider } from 'react-redux';
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

export default App;
