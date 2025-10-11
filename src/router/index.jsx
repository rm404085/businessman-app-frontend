import App from "@/App";
import About from "@/page/about/About";
import CetagoryPage from "@/page/cetagoryPage/CetagoryPage";
import HomePage from "@/page/homePage/HomePage";
import Live from "@/page/live/Live";
import Manufacture from "@/page/manufacture/Manufacture";
import NotFound from "@/page/notFound/NotFound";
import Photo from "@/page/photo/Photo";
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
                }
            ]
           
        
        }
    ]
)