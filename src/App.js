import { useRoutes } from "react-router-dom";
import routes from "./routes";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./app.scss";

function App() {
  return useRoutes(routes);
}

export default App;
