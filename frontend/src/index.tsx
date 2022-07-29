import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import rootReducer from "../src/reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootReducerType = ReturnType<typeof rootReducer>;

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
