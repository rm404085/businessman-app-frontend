import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import VedioCategory from "../Category/vedioCategory/VedioCategory";
import {motion} from "framer-motion"
import Navbar from "./Navbar";
import { useEffect } from "react";
import Footer from "./Footer";
import { matchPath, useLocation } from "react-router";

const CommonLayout = ({children}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.4, // 40% element দেখলে trigger হবে
    triggerOnce: false, // scroll up/down ও trigger হবে
  });

  const location = useLocation();
  const isMarketPage = location.pathname === "/market";
    const isRentPage = location.pathname === "/rent";
  const isCarPage = location.pathname === "/car";
  const match = matchPath("/video/:id", location.pathname);
const isVideoDetails = !!match;

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 10, transition: { duration: 0.6 } },
  };


    return (
        <div className="min-h-screen flex flex-col">
          {
            !isVideoDetails && (
<Navbar></Navbar>
            )
          }

{
  !isMarketPage && !isRentPage && !isCarPage && !isVideoDetails && (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      className="mt-16"
    >
      <VedioCategory />
    </motion.div>
  )
}
<div className="grow">{children}</div>
{
  !isVideoDetails && (
    <Footer></Footer>

  )
}
     

        </div>
    )

}

export default CommonLayout;
