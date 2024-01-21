import "./App.css";
import { Provider } from "react-redux";
import AppRoute from "./routes/routes.jsx";
import { store } from "./store/createStore";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoute />
      </div>
    </Provider>
  );
}

export default App;
