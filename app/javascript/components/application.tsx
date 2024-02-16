import * as React from "react";
import * as ReactDOM from "react-dom/client";

interface AppProps {
  arg: string;
}

const App = ({ arg }: AppProps) => {
  return <div>{`Welcome, ${arg}!`}</div>;
};

document.addEventListener("DOMContentLoaded", () => {
	const rootDiv = document.getElementById("root")!
	const root = ReactDOM.createRoot(rootDiv);
	root.render(<App arg="Rails 7 with ESBuild" />);
});