import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
// import PrivateRoute from "./Routes/PrivateRoute";
import theme from "./Style/theme";
// import { privateRoutes } from "./Routes/GetPrivateRoutes";
import { publicRoutes } from "./Routes/PublicRoutes";
import { ThemeProvider } from "@mui/material";

import { toast } from "react-toastify";
// import Layout from "./Containers/Layout/Layout";

import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./PageNotFound/PageNotFound";

toast.configure();

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense>
            <Routes>
              {publicRoutes.map((publicRouteDetail, index) => {
                return (
                  <Route
                    key={index}
                    exact
                    path={publicRouteDetail.path}
                    element={publicRouteDetail.component}
                  />
                );
              })}

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
