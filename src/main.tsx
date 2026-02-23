import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
);
