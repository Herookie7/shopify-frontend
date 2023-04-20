import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Link as ReactRouterLink,
} from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { AppProvider, Frame } from "@shopify/polaris";
import Customers from "./components/Customers/Customers.js";
import Products from "./components/Products/Products";
import Orders from "./components/Orders/Orders";
import  TopBarMarkup  from "./components/utils/Topbar";
import  SideNavMarkup  from "./components/utils/Sidebar";
import { useContext, useEffect } from "react";
import appContext from "./components/context/Createcontext";
import axios from 'axios';

function App() {
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      if (token === null) {
        try {
          const response = await axios.get('http://localhost:3000/api/token');
          const accessToken = response.data.accessToken;
          localStorage.setItem('token', accessToken);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);
  const { isMenuOpen, toggleMenu } = useContext(appContext);
  return (
    <div className="App">
      <BrowserRouter>
        <AppProvider linkComponent={Link}>
          <Frame
            topBar={TopBarMarkup()}
            navigation={SideNavMarkup()}
            showMobileNavigation={isMenuOpen}
            onNavigationDismiss={toggleMenu}
            skipToContentTarget={
              <div className="Polaris-VisuallyHidden">Content</div>
            }
          >
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/products" element={<Products />}></Route>
              <Route path="/customers" element={<Customers />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
            </Routes>
          </Frame>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;
function Link({ children, url = "", external, ref, ...rest }) {
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = "_blank";
    rest.rel = "noopener noreferrer";
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

export default App;
