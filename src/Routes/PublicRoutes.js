import React, { lazy } from "react";
import {
  FAQS,
  BLOGS,
  ROOT,
  VALUE_PROPOSITION,
  ABOUT_US,
  PRODUCT_LISTING_EXPANDED,
  SINGLE_BLOG_PAGE,
  SELECTED_PRODUCT_DETAILS,
  WHO_NEEDS_SOFTWARE,
} from "./Routes";
const AboutUsView = lazy(() =>
  import("../Components/LandingPage/AboutUsPage/AboutUsPage.jsx")
);

const FaqsView = lazy(() => import("../Containers/Faqs/Faqs.jsx"));

const BlogsView = lazy(() => import("../Components/LandingPage/Blog/Blog"));

const SingleBlogPostView = lazy(() =>
  import("../Components/LandingPage/Blog/SingleBlogPage")
);

const LandingPage = lazy(() => import("../Components/LandingPage/LandingPage"));

const ExpandedProductListing = lazy(() =>
  import(
    "../Components/LandingPage/ProductListing/ProductListingExpanded/ProductListExpanded"
  )
);

const SelectedProductDetails = lazy(() =>
  import(
    "../Components/LandingPage/ProductListing/ProductDetailsContainer/ProductDetailsContainers.jsx"
  )
);

const WhoNeedsSoftware = lazy(() =>
  import(
    "../Components/LandingPage/WhoNeedsTheSoftware/WhoNeedsTheSoftware.jsx"
  )
);

const ValuePropsitionsView = lazy(() =>
  import("../Components/LandingPage/ValPropositions/Valuepropostions.jsx")
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
    path: BLOGS,
    component: <BlogsView />,
  },
  {
    path: SINGLE_BLOG_PAGE,
    component: <SingleBlogPostView />,
  },
  {
    path: PRODUCT_LISTING_EXPANDED,
    component: <ExpandedProductListing />,
  },
  {
    path: SELECTED_PRODUCT_DETAILS,
    component: <SelectedProductDetails />,
  },
  {
    path: WHO_NEEDS_SOFTWARE,
    component: <WhoNeedsSoftware />,
  },
];
