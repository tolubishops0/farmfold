import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./Style/theme";
import { publicRoutes } from "./Routes/PublicRoutes";
import { ThemeProvider } from "@mui/material";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./PageNotFound/PageNotFound";
import { ProductsProvider } from "./chore/ProductContext";
import Navbar from "../src/otherPages/NavBar/NavBar.jsx";
import Footer from "../src/otherPages/Footer/Footer.jsx";

toast.configure();

const App = () => {
  return (
    <ProductsProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {publicRoutes.map((publicRouteDetail, index) => (
              <Route
                key={index}
                path={publicRouteDetail.path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    {publicRouteDetail.component}
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </ProductsProvider>
  );
};

export default App;
