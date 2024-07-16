import "./scss/index.scss";

import App from "./App.tsx";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store.ts";

const store = setupStore();

ReactDOM.createRoot(document.querySelector(".wrapper")!).render(
	<Provider store={store}>
		<App />
	</Provider>
);
