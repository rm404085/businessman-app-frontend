import App from "@/App";
import PhotoDetails from "@/components/details/photoDetails/PhotoDetails";
import ShortDetails from "@/components/details/shortDetails/ShortDetails";
import VideoDetails from "@/components/details/videoDetails/VideoDetails";
import ProductPhoto from "@/components/ProductManufacture/ProductPhoto/ProductPhoto";
import About from "@/page/about/About";
import Car from "@/page/car/Car";
import CetagoryPage from "@/page/cetagoryPage/CetagoryPage";
import HomePage from "@/page/homePage/HomePage";
import Live from "@/page/live/Live";
import Manufacture from "@/page/manufacture/Manufacture";
import Market from "@/page/market/Market";
import NotFound from "@/page/notFound/NotFound";
import Photo from "@/page/photo/Photo";
import Rent from "@/page/rent/Rent";
import Require from "@/page/require/Require";
import Review from "@/page/review/Review";
import Shorts from "@/page/short/Shorts";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path:"video/:id",
        element:<VideoDetails></VideoDetails>
      },

      {
        path: "category/:categoryName",
        element: <CetagoryPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "manufacture",
        element: <Manufacture />,
      },
      {
        path:"manufacture/productsPhoto",
        element:<ProductPhoto></ProductPhoto>
      },
      {
        path: "live",
        element: <Live />,
      },
      {
        path: "photo",
        element: <Photo />,
      },
      {
        path:"photo/:id",
        element:<PhotoDetails></PhotoDetails>
      },
      {
        path: "short",
        element: <Shorts />,
      },
      {
        path: "short/:id",
        element:<ShortDetails></ShortDetails>
      },
      {
        path: "require",
        element: <Require />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "market",
        element: <Market />,
      },
      {
        path: "rent",
        element: <Rent />,
      },
      {
        path: "car",
        element: <Car />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
