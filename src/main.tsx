import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./routes";

// biome-ignore lint: no-unused-expressions
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
