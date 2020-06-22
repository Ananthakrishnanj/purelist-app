import React from 'react';
import HomeContainer from './components/HomeContainer';
import store from './redux/store';
import { Provider } from 'react-redux';
import "./assets/styles/main.css";
import "./assets/styles/app.css";

function App() {
  return (
    <Provider store={store}>
    <div className="min-h-screen">
      <HomeContainer />
    </div>
    </Provider>
  );
}

export default App;
