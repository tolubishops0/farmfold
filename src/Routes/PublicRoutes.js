import {
  FAQS,
  ROOT,
  VALUE_PROPOSITION,
  ABOUT_US,
  VIEW_MARKETPLACE,
  SELECTED_PRODUCT_DETAILS,
  WHO_NEEDS_SOFTWARE,
} from "./Routes";

import LandingPage from "../Homepage/HomePage.jsx";
import AboutUsView from "../otherPages/AboutUsPage/AboutUsPage.jsx";
import FaqsView from "../otherPages/Faqs/Faqs.jsx";
import WhoNeedsSoftware from "../otherPages/WhoNeedsTheSoftware/WhoNeedsTheSoftware.jsx";
import ValuePropsitionsView from "../otherPages/ValPropositions/Valuepropostions.jsx";
import ViewMarketplace from "../otherPages/Market/MarketPlace.jsx";
import SelectedProductDetails from "../otherPages/Market/Productdetail/Productdetail.jsx";

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
