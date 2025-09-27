import App from "@/App";
import About from "@/page/about/About";
import HomePage from "@/page/homePage/HomePage";
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
                    Component:About,
                    path:"about",
                }
            ]
           
        
        }
    ]
)