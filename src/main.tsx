import { render } from "solid-js/web";
import { App } from "./components/App";

const root = document.getElementById("app");

if (root === null) {
  throw new Error(`No app root`);
}

render(() => <App />, root);
