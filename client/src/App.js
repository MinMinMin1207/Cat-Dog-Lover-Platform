// Import library
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = Fragment;
            if (route.Layout) {
              Layout = route.Layout;
            }
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
