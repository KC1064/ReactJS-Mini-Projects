import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import Footer from "./Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="h-[100vh] w-[100%]">
      <App />
      {/* <Footer /> */}
    </div>
  </StrictMode>
);
