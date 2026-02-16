import React, { lazy } from "react";
import {
  FAQS,
  ROOT,
  VALUE_PROPOSITION,
  ABOUT_US,
  VIEW_MARKETPLACE,
  SELECTED_PRODUCT_DETAILS,
  WHO_NEEDS_SOFTWARE,
} from "./Routes";

const LandingPage = lazy(() => import("../Homepage/HomePage.jsx"));

const AboutUsView = lazy(
  () => import("../otherPages/AboutUsPage/AboutUsPage.jsx"),
);

const FaqsView = lazy(() => import("../otherPages/Faqs/Faqs.jsx"));

const WhoNeedsSoftware = lazy(
  () => import("../otherPages/WhoNeedsTheSoftware/WhoNeedsTheSoftware.jsx"),
);

const ValuePropsitionsView = lazy(
  () => import("../otherPages/ValPropositions/Valuepropostions.jsx"),
);

const ViewMarketplace = lazy(
  () => import("../otherPages/Market/MarketPlace.jsx"),
);

const SelectedProductDetails = lazy(
  () => import("../otherPages/Market/Productdetail/Productdetail.jsx"),
);

export const publicRoutes = [
  {
    path: ROOT,
    component: <LandingPage />,
  },
  {
    path: FAQS,
    component: <FaqsView />,
  },
  {
    path: VALUE_PROPOSITION,
    component: <ValuePropsitionsView />,
  },
  {
    path: ABOUT_US,
    component: <AboutUsView />,
  },
  {
    path: WHO_NEEDS_SOFTWARE,
    component: <WhoNeedsSoftware />,
  },
  {
    path: VIEW_MARKETPLACE,
    component: <ViewMarketplace />,
  },
  {
    path: SELECTED_PRODUCT_DETAILS,
    component: <SelectedProductDetails />,
  },
];
