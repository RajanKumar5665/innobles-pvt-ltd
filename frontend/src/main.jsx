import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { store } from "./app/store";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);


