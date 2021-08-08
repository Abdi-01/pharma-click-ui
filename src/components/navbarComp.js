import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/navigation.css";
import Logo from "../assets/images/logo.png";
import Profile from "../assets/images/profile.png";
import { connect } from "react-redux";
import { authLogout } from "../action";
import axios from "axios";
import CartEmpty from "../assets/images/emptyCart.jpg";
import { URL_API } from "../Helper";

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, role: "user", file: this.checkImage() };
  }

  componentDidMount() {
    this.checkImage()
    let list = document.querySelectorAll(`.menu-item`);
    for (let i = 0; i < list.length; i++) {
      list[i].onclick = function () {
        let j = 0;
        while (j < list.length) {
          list[j++].className = "menu-item";
        }
        list[i].className = "menu-item active";
      };
    }
  }

  checkImage = () => {
    if(this.props.user.profile_image){
      return `${URL_API}/${this.props.user.profile_image}`
    }else{
      return Profile
    }
  }

  btLogout = () => {
    this.props.authLogout();
  };

  cekQtyCart = () => {
    return this.props.user.cart.reduce((a, v) => (a = a + v.qty), 0);
  };

  printCart = () => {
    return this.props.user.cart.length < 0 ? (
      <DropdownItem>Cart is Empty</DropdownItem>
    ) : (
      this.props.user.cart.map((item, index) => {
        return (
          // <DropdownItem style={{ width: 400 }}>
          <Container style={{ width: 300 }}>
            <Row>
              <Col md="4">
                <img src={item.image_url} width="80%" />
              </Col>
              <Col md="8">
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: "0.9em",
                  }}
                >
                  <strong>{item.product_name}</strong>
                </p>
                <p style={{ marginBottom: 0, fontSize: "0.8em" }}>
                  Qty : {item.qty}
                </p>
                <p style={{ marginBottom: 0, fontSize: "0.8em" }}>
                  Rp. {item.price.toLocaleString()}
                </p>
              </Col>
              {/* <hr style={{ border: "2px solid #288F94", marginTop: "15px" }} /> */}
            </Row>
          </Container>
          // </DropdownItem>
        );
      })
    );
  };

  render() {
    return (
      <div>
        <Navbar
          color="light"
          light
          expand="md"
          className="px-3  navi-item"
          fixed="top"
        >
          <Link to="/product" style={{ textDecoration: "none" }}>
            <NavbarBrand>
              <img src={Logo} width="150px" alt="logo pharmaclick" />
            </NavbarBrand>
          </Link>
          <NavbarToggler
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="m-auto " navbar>
              <NavItem>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <NavLink>
                    <a className="menu-item active">Home</a>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/product">
                    <a className="menu-item">Products</a>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <Link to="/contact">
                  <NavLink>
                    <a className="menu-item">Contact</a>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/custom">
                  <NavLink>
                    <a className="menu-item">Custom Order</a>
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
            {this.props.user.role === "user" ? (
              <div className="d-flex justify-content-end align-items-center drop-menu">
                <NavItem type="none">
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <NavLink href="#">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span
                          class="badge bg-primary rounded-pill"
                          style={{ color: "white" }}
                        >
                          {this.cekQtyCart()}
                        </span>
                      </NavLink>
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.props.user.cart.length > 0 ? (
                        <>
                          {this.printCart()}
                          <DropdownItem divider />
                          <DropdownItem>
                            <Link
                              to="/cart"
                              style={{
                                fontSize: "calc(5px + 1vmin)",
                                textDecoration: "none",
                                color: "black",
                                cursor: "pointer",
                              }}
                            >
                              Go To Cart
                            </Link>
                          </DropdownItem>
                        </>
                      ) : (
                        <>
                          <Container>
                            <Row>
                              <center>
                                <Col md="12">
                                  <img
                                    src={CartEmpty}
                                    alt="cart empty"
                                    width="50%"
                                  />
                                </Col>
                                <Col
                                  md="12 mt-2"
                                  style={{ fontWeight: 900, fontSize: "0.8em" }}
                                >
                                  Your Cart is Empty
                                </Col>
                              </center>
                            </Row>
                          </Container>
                        </>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem type="none" style={{ marginRight: "10px" }}>
                  <a>{this.props.user.fullname.split(" ")[0]}</a>
                </NavItem>
                {this.props.user.profile_image ?(<><img
                  src={`${URL_API}/${this.props.user.profile_image}`}
                  width="35px;"
                  height="35px;"
                  style={{ borderRadius: "50%" }}
                  alt="profile image"
                /></>):(
                  <>
                  <img
                  src={Profile}
                  width="35px;"
                  height="35px;"
                  style={{ borderRadius: "50%" }}
                  alt="profile image"
                />
                </>
                )}
                
                <UncontrolledDropdown>
                  <DropdownToggle nav caret></DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <DropdownItem>Edit Profile</DropdownItem>
                    </Link>
                    <DropdownItem>Change Password</DropdownItem>
                    <Link
                      to="/"
                      style={{ textDecoration: "none" }}
                      onClick={this.btLogout}
                    >
                      <DropdownItem>Logout</DropdownItem>
                    </Link>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ) : this.props.user.role === "admin" ? (
              <>
                <div className="d-flex justify-content-end align-items-center drop-menu">
                  <NavbarText style={{ marginRight: "10px" }}>
                    <a>{this.props.user.fullname.split(" ")[0]}</a>
                  </NavbarText>
                  <img src={Profile} width="5%" alt="profile image" />
                  <UncontrolledDropdown>
                    <DropdownToggle nav caret></DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Add Product</DropdownItem>
                      <DropdownItem>Transaction Managmeent</DropdownItem>
                      <DropdownItem>History</DropdownItem>
                      <DropdownItem onClick={this.btLogout}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex regist">
                  <NavbarText className="mr-3">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <a className="menu-item">Login</a>
                    </Link>
                  </NavbarText>
                  &nbsp;
                  <NavbarText>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      <a className="menu-item">Register</a>
                    </Link>
                  </NavbarText>
                  &nbsp;
                </div>
              </>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer, authReducer }) => {
  return {
    products: productReducer.product_list,
    user: authReducer,
    profile: productReducer.image_profile,
  };
};

export default connect(mapStateToProps, { authLogout })(
  NavbarComp
);
