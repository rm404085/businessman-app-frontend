import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({children}) => {

    return (
        <div className="min-h-screen flex flex-col">
<Navbar></Navbar>
<div className="grow">{children}</div>
<Footer></Footer>
        </div>
    )

}

export default CommonLayout;
