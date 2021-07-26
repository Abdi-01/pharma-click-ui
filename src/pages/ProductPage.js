import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faSearch,
  faFilter,
  faTimes,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "../assets/css/productPage.css"
// import "../assets/css/navogation.css"
import { Carousel } from "react-responsive-carousel";
import BannerProduct from "../assets/images/bannerProduct.gif"
import { connect } from "react-redux";
import { getProductAction } from '../action'
import { Link } from "react-router-dom";
// import Product1 from "../assets/images/product1.jpg";
// import Product2 from "../assets/images/product2.jpg";
// import Product3 from "../assets/images/product3.jpg";
// import Product5 from "../assets/images/product5.jpg";
// import Product6 from "../assets/images/product6.jpg";

var settings = {
  dots: true,
  speed: 200,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        centerMode: false,
        centerPadding: "50px",
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 540,
      settings: {
        arrows: true,
        centerMode: false,
        centerPadding: "50px",
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: false,
        centerPadding: "60px",
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 280,
      settings: {
        arrows: true,
        centerMode: false,
        centerPadding: "30px",
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 268,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "20px",
        slidesToShow: 4,
      },
    },
  ],
};

var product = [
  {
    nama: "sanmol",
    img: 'Product1',
    harga: 50000,
  },
  {
    nama: "Paracetamol",
    img: 'Product2',
    harga: 45000,
  },
  {
    nama: "Pamol",
    img: 'Product3',
    harga: 15000,
  },
  {
    nama: "Interpec",
    img: 'Product5',
    harga: 70000,
  },
  {
    nama: "Alcoplus",
    img: 'Product6',
    harga: 35000,
  },
  {
    nama: "Alcoplus",
    img: 'Product6',
    harga: 25000,
  },
  {
    nama: "sanmol",
    img: 'Product1',
    harga: 50000,
  },
  {
    nama: "Paracetamol",
    img: 'Product2',
    harga: 45000,
  },
  {
    nama: "Pamol",
    img: 'Product3',
    harga: 15000,
  },
  {
    nama: "Interpec",
    img: 'Product5',
    harga: 70000,
  },
  {
    nama: "Alcoplus",
    img: 'Product6',
    harga: 35000,
  },
  {
    nama: "Alcoplus",
    img: '',
    harga: 25000,
  },
  {
    nama: "sanmol",
    img: 'Product1',
    harga: 50000,
  },
  {
    nama: "Paracetamol",
    img: 'Product2',
    harga: 45000,
  },
  {
    nama: "Pamol",
    img: 'Product3',
    harga: 15000,
  },
  {
    nama: "Interpec",
    img: 'Product',
    harga: 70000,
  },
  {
    nama: "Alcoplus",
    img: 'Product6',
    harga: 35000,
  },
  {
    nama: "Alcoplus",
    img: 'Product6',
    harga: 25000,
  },
];

var category = [
  {
    nama: "Covid",
    img: 'Product6',
  },
  {
    nama: "Mata",
    img: 'Product6',
  },
  {
    nama: "Batuk",
    img: 'Product6',
  },
  {
    nama: "Flu",
    img: 'Product6',
  },
  {
    nama: "Demam",
    img: 'Product6',
  },
  {
    nama: "Asma",
    img: ' Product6',
  },
];

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      currentPage: 1,
      todosPerPage: 16,
      modal: false,
      modalProtection: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let list = document.querySelectorAll(`.list`);
    for (let i = 0; i < list.length; i++) {
      list[i].onclick = function () {
        let j = 0;
        while (j < list.length) {
          list[j++].className = "list";
        }
        list[i].className = "list active";
      };
    }
    this.props.getProductAction(1)
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  printFilterAll = () => {
    return (
      <>
        <Col xl="2" lg="2" md="2">
          <Container fluid className="category-drop mt-2">
            <Row>
              <Col xl="12 mt-4">
                {/* FILTER */}
                <div className="filter">
                  <Col md="12">
                    <a className="trigger">
                      <FontAwesomeIcon icon={faFilter} /> FILTER
                    </a>
                  </Col>
                </div>
              </Col>

              {/* CATEGORY */}
              <Col md="12 mt-3" className="category-title">
                <Form>
                  <FormGroup row>
                    <Label for="checkbox2" xl={12}>
                      Category
                    </Label>
                    <Col xl={{ size: 12 }}>
                      {category.map((item) => {
                        return (
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio2" />
                              {item.nama}
                            </Label>
                          </FormGroup>
                        );
                      })}
                    </Col>
                  </FormGroup>
                </Form>
              </Col>

              <Col md="2" className="category-title">
                <hr className="mt-3" />
                <Form>
                  <FormGroup row>
                    <Label for="price" xl={12}>
                      Range Price
                    </Label>
                    <Col xl={{ size: 12 }}>
                      <div className="d-flex justify-content-center align-items-center">
                        <div>
                          <Input
                            type="text"
                            name="min"
                            placeholder="Minimum"
                            className="p-1"
                            style={{ fontSize: "13px" }}
                          />
                        </div>
                        <div>
                          <p>_</p>
                        </div>
                        <div>
                          <Input
                            type="text"
                            name="maks"
                            placeholder="Maximum "
                            className="p-1"
                            style={{ fontSize: "13px" }}
                          />
                        </div>
                      </div>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>

              <Col md="12"></Col>

              <Col md="2" className="category-title">
                <hr className="mt-3" />
                <Form>
                  <FormGroup row>
                    <Label for="price" xl={12}>
                      Sort By
                    </Label>
                    <Col xl={{ size: 12 }}>
                      <FormGroup>
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          style={{ fontSize: "13px" }}
                        >
                          <option>-</option>
                          <option>Highest Price</option>
                          <option>Lowest Price</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>

              <Col md="12 submit mt-3">
                <a style={{ color: "white" }}>Submit</a>
              </Col>
            </Row>
          </Container>
        </Col>
      </>
    );
  };

  printFilter = () => {
    // MOBILE VIEW
    return (
      <>
        <Modal
          isOpen={this.state.modal}
          toggle={() => {
            this.setState({ modal: !this.state.modal });
          }}
          style={{ marginTop: "30%" }}
          className="modal-filter"
        >
          <ModalBody>
            <div className="d-flex justify-content-between align-items-center">
              <h6>Add Address</h6>
              <a
                className="close"
                onClick={() => {
                  this.setState({ modal: !this.state.modal });
                }}
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </a>
            </div>

            <Container>
              <Row>
                <Col xl="12" lg="12" md="12">
                  <Container fluid className=" mt-2">
                    <Row>
                      <Col xl="12 mt-4">
                        {/* FILTER */}
                        <div className="filter">
                          <Col md="12">
                            <a className="trigger">
                              <FontAwesomeIcon icon={faFilter} /> FILTER
                            </a>
                          </Col>
                        </div>
                      </Col>

                      {/* CATEGORY */}
                      <Col md="12 mt-3" className="category-title">
                        <Form>
                          <FormGroup row>
                            <Label for="checkbox2" xl={12}>
                              Category
                            </Label>
                            <Col xl={{ size: 12 }}>
                              {category.map((item) => {
                                return (
                                  <FormGroup check>
                                    <Label check>
                                      <Input type="radio" name="radio2" />
                                      {item.nama}
                                    </Label>
                                  </FormGroup>
                                );
                              })}
                            </Col>
                          </FormGroup>
                        </Form>
                      </Col>

                      <Col md="12" className="category-title">
                        <hr className="mt-3" />
                        <Form>
                          <FormGroup row>
                            <Label for="price" xl={12}>
                              Range Price
                            </Label>
                            <Col xl={{ size: 12 }}>
                              <div className="d-flex justify-content-center align-items-center">
                                <div>
                                  <Input
                                    type="text"
                                    name="min"
                                    placeholder="Minimum"
                                    className="p-1"
                                    style={{ fontSize: "calc(5px + 1vmin)" }}
                                  />
                                </div>
                                <div>
                                  <p>_</p>
                                </div>
                                <div>
                                  <Input
                                    type="text"
                                    name="maks"
                                    placeholder="Maksimum "
                                    className="p-1"
                                    style={{ fontSize: "calc(5px + 1vmin)" }}
                                  />
                                </div>
                              </div>
                            </Col>
                          </FormGroup>
                        </Form>
                      </Col>

                      <Col md="12"></Col>

                      <Col md="12" className="category-title">
                        <hr className="mt-3" />
                        <Form>
                          <FormGroup row>
                            <Label for="price" xl={12}>
                              Sort By
                            </Label>
                            <Col xl={{ size: 12 }}>
                              <FormGroup>
                                <Input
                                  type="select"
                                  name="select"
                                  id="exampleSelect"
                                  style={{ fontSize: "13px" }}
                                >
                                  <option>-</option>
                                  <option>Harga Tertinggi</option>
                                  <option>Harga Terendah</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </FormGroup>
                        </Form>
                      </Col>

                      <Col md="12 submit mt-3">
                        <a style={{ color: "white" }}>Submit</a>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </>
    );
  };

  onAddCart = () => {
    if (!this.props.iduser) {
      this.setState({ modalProtection: !this.modalProtection })

    } else {
      // fungsi add to cart
    }
  }
  render() {
    const { currentPage, todosPerPage } = this.state;
    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.props.product.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(product.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <Container fluid className="mt-5">
        <Row>
          {/* Sidebar */}
          {this.printFilterAll()}

          {/* Banner */}
          <Col xl="10 mt-4" lg="10 mt-3" md="10 mt-3" sm="12 mt-3" xs="12 mt-3">
            <Container fluid>
              <Row>
                <Col md="12">
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showArrows={true}
                    axis={"vertical"}
                    className="carousel-product"
                  >
                    <div>
                      <img src={BannerProduct} />
                    </div>
                    {/* <div>
                      <img src="assets/2.jpeg" />
                    </div>
                    <div>
                      <img src="assets/3.jpeg" />
                    </div> */}
                  </Carousel>
                </Col>

                {/* BANNER KANAN */}
              </Row>
            </Container>

            {/* EXPLORE CATEGORY */}
            <Container className="mt-2">
              <Row>
                <div className="explore-category mt-3 d-none">
                  <Col md="12" className="text-bolder">
                    Explore Popular Categories
                  </Col>
                  <Col md="12">
                    <Slider {...settings}>
                      {category.map((item) => {
                        return (
                          <div className="mt-2 card-popular">
                            <Card tag="card">
                              {/* <CardImg
                              width="100%"
                              src={item.img}
                              alt="sanmol"
                              className="img-fluid p-2"
                              style={{
                                borderRadius: "15px",
                              }}
                            /> */}
                              <p className="title-products text-center">
                                {item.nama}
                              </p>
                            </Card>
                          </div>
                        );
                      })}
                    </Slider>
                  </Col>
                </div>
              </Row>
            </Container>

            {/* PRODUCTS */}
            <Container>
              <Row>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="product-title">
                    <h6>Products</h6>
                  </div>
                  <div>
                    <div class="input-group">
                      <div class="form-outline">
                        <input
                          type="search"
                          id="form1"
                          class="form-control p-1"
                        />
                      </div>
                      <Button
                        color="primary "
                        style={{ paddingInline: "12px", paddingBlock: "0px" }}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                    </div>
                  </div>
                </div>
                <Col md="12" className="text-bolder mt-3">
                  <div className="explore-filter ">
                    <Col md="12">
                      {this.printFilter()}
                      <a
                        className="trigger"
                        onClick={() => {
                          this.setState({ modal: !this.state.modal });
                        }}
                      >
                        <FontAwesomeIcon icon={faFilter} /> Filter
                      </a>
                    </Col>
                  </div>
                </Col>

                {currentTodos.map((item) => (
                  <Col
                    xl="3 mt-2"
                    lg="3 mt-2"
                    md="3 mt-2"
                    sm="3 mt-2"
                    xs="4 mt-2"
                  >
                    <Card
                      style={{
                        // borderRadius: "15px",
                        margin: "5px",
                        minHeight: "80%",
                        borderRadius: "8px",
                        backgroundColor: "rgb(245,247,251)",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                      className="card-medicine"
                    >
                      <ul className="action">
                        <li>
                          <FontAwesomeIcon
                            icon={faEye}
                            className="icon-product"
                          />
                          <span>Detail</span>
                        </li>
                        <li>
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            className="icon-product"
                            onClick={this.onAddCart}
                          />
                          <span>Add to cart</span>
                        </li>
                      </ul>
                      <CardBody className="p-2 d-flex flex-column">
                        <img
                          top
                          width="100%"
                          height="auto"
                          src={item.images[0]}
                          alt="sanmol"
                          className="img-fluid "
                        />
                        <CardTitle className="title-products p-0">
                          {item.product_name}
                        </CardTitle>
                        <CardSubtitle className="mb-2 price-products">
                          Rp {item.pack_price}
                        </CardSubtitle>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>

            <Container className="mt-5">
              <Row>
                <Col md="4 m-auto" xs="9 m-auto" sm="4 m-auto">
                  <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                      <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink previous href="#" />
                    </PaginationItem>
                    {pageNumbers.map((item) => {
                      return (
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            key={item}
                            id={item}
                            onClick={this.handleClick}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                  </Pagination>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Modal isOpen={this.state.modalProtection} toggle={() => this.setState({ modalProtection: !this.state.modalProtection })}>
          <ModalHeader>Cannot do transaction!</ModalHeader>
          <ModalBody>
            To continue transaction please login!
          </ModalBody>
          <ModalFooter>
            <Link to="/login">
              <Button color="primary" onClick={() => this.setState({ modalProtection: !this.state.modalProtection })}>Login</Button>{' '}
            </Link>
            <Button color="secondary" onClick={() => this.setState({ modalProtection: !this.state.modalProtection })}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = ({ productReducer, authReducer }) => {
  return {
    product: productReducer.product_list, iduser: authReducer.id
  }
}
export default connect(mapStateToProps, { getProductAction })(ProductPage);
