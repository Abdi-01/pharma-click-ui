import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SidebarComp from "./components/SidebarComp";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PassResetPage from "./pages/PassResetPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import CustomProductManagementPage from "./pages/CustomProductManagement";
import ProductPage from "./pages/ProductPage";
import VerificationPage from "./pages/VerificationPage";
import ProfilePage from "./pages/profilePage";
import NavbarComp from "./components/navbarComp";
import FooterComp from "./components/footerComp";
import ContactPage from "./pages/ContactPage";
import ManagementOrderCustomPage from "./pages/ManagementOrderCustomPage";
import CartPage from "./pages/CartPage";
import CustomOrderPage from "./pages/CustomOrderPage";
import { keepLogin, getProductAction } from "./action";
import ProductDetailPage from "./pages/ProductDetailPage";
import TransactionAdminPage from "./pages/TransactionAdminPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.reLogin();
  }

  reLogin = async () => {
    try {
      let token = localStorage.getItem("tkn_id");
      if (token) {
        this.props.keepLogin(token);
      }
    } catch (error) {
      console.log("keep login error", error);
    }
  };

  render() {
    return (
      <>
        {this.props.role === "user" ? (
          <>
            <NavbarComp />
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path={"/login"} component={LoginPage} />
              <Route path={"/product"} component={ProductPage} />
              <Route path={"/profile"} component={ProfilePage} />
              <Route path={"/contact"} component={ContactPage} />
              <Route path={"/cart"} component={CartPage} />
              <Route path={"/detail"} component={ProductDetailPage} />
              <Route path={"/custom"} component={CustomOrderPage} />
              <Route path={"*"} component={NotFoundPage} />
            </Switch>
            <FooterComp />
          </>
        ) : this.props.role === "admin" ? (
          <>
            <SidebarComp />
            <Switch>
              <Route path={"/login"} component={LoginPage} />
              <Route path="/dashboard" component={DashboardPage} exact />
              <Route
                path={"/product-management"}
                component={ProductManagementPage}
              />
              <Route
                path={"/custom-product-management"}
                component={CustomProductManagementPage}
              />
              <Route
                path={"/custom-order"}
                component={ManagementOrderCustomPage}
              />
              <Route path="/transactions" component={TransactionAdminPage} />
              <Route path={"*"} component={NotFoundPage} />
            </Switch>
            <FooterComp />
          </>
        ) : (
          <>
            <NavbarComp />
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path={"/product"} component={ProductPage} />
              <Route path={"/login"} component={LoginPage} />
              <Route path={"/register"} component={RegisterPage} />
              <Route path={"/reset"} component={PassResetPage} />
              <Route path={"/verif"} component={VerificationPage} />
              <Route path={"/contact"} component={ContactPage} />
              <Route path={"/detail"} component={ProductDetailPage} />
              <Route path={"*"} component={NotFoundPage} />
              <Route path={"/custom"} component={CustomOrderPage} />
            </Switch>
            <FooterComp />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    ...authReducer,
  };
};

export default connect(mapStateToProps, {
  getProductAction,
  keepLogin,
  // getImageProfileUser,
})(App);
