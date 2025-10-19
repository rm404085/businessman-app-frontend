import { Outlet, useLocation } from 'react-router-dom';
import CommonLayout from './components/layout/CommonLayout';
import Footer from './components/layout/Footer';

function App() {
  // const location = useLocation();

  // const hideFooterPaths = ["/short"];
  // const showFooter = !hideFooterPaths.some(path =>
  //   location.pathname.startsWith(path)
  // );
  // console.log("Current path:", location.pathname, "Show footer?", showFooter);

  return (
    <CommonLayout>
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <div className="flex-1">
          <Outlet />
        </div>

        {/* Footer conditionally */}
        {/* {showFooter && <Footer />} */}
      </div>
    </CommonLayout>
  );
}

// ✅ Default export যোগ করা হলো
export default App;
