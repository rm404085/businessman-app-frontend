
import Navbar from "./Navbar";

import Footer from "./Footer";
import { matchPath, useLocation } from "react-router";

const CommonLayout = ({children}) => {
  
  const location = useLocation();
 
    const isPhotoPage = location.pathname.startsWith("/photo");
    const isShortPage = location.pathname.startsWith("/short");
    const isManufacture = location.pathname.startsWith("/manufacture");
  const match = matchPath("/video/:id", location.pathname);
  const photo = matchPath("/photo/:id", location.pathname);
  const short = matchPath("/short/:id", location.pathname);
 const isPhotoDetails = !!photo;
const isVideoDetails = !!match;
const isShortDetails = !!short;

  


    return (
        <div className="min-h-screen flex flex-col">
          {
    !isShortPage && !isVideoDetails && !isManufacture && (
        <div className={isPhotoPage ? "hidden md:block" : ""}>
<Navbar></Navbar>
        </div>

            )
          }

  
<div className="grow">{children}</div>
{
 !isPhotoDetails && !isVideoDetails && !isShortDetails && (
    <Footer></Footer>

  )
}
     

        </div>
    )

}

export default CommonLayout;
