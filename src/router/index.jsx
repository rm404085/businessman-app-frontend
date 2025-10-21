import App from "@/App";
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

import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter(
    [
        {   
             Component:App,
            path:"/",
            children:[
                {
                    Component:HomePage,
                    index:true,
                },
                {
                    Component:CetagoryPage,
                    path:"/category/:categoryName",
                },
                {
                    Component:About,
                    path:"about",
                },
                {
                    Component:Manufacture,
                    path:"manufacture"
                },
                {
                    Component:Live,
                    path:"live"
                },
                {
                    Component:Photo,
                    path:"photo"
                },
                {
                    path:"/short",
                    element:<Shorts></Shorts>
                },
                {
                    path:"*",
                    Component:NotFound
                },
                {
                    path:"require",
                    Component:Require
                },

                {
                    path:"review",
                    Component:Review
                },
                {
                    path:"market",
                    Component:Market
                },
                {
                    path:"rent",
                    Component:Rent,
                },
                {
                    path:"car",
                    Component:Car
                }
            ]
           
        
        }
    ]
)