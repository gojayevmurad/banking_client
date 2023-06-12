import { useRoutes } from "react-router-dom";
import routes from "./routes";

import './app.scss';

function App() {


  return useRoutes(routes);
}

export default App;
