import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardTitle,
  CardText,
  Button,
  FormGroup,
  Label,
  Input,
  Alert,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
} from "reactstrap";
import HTTP from "../service/HTTP.js";
import Upload from "../assets/images/bg-upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/TransactionPage.css";
import { URL_API } from "../Helper";
import axios from "axios";
import { connect } from "react-redux";
import { TabView, TabPanel } from 'primereact/tabview';
import { TabMenu } from 'primereact/tabmenu';
import { Rating } from 'primereact/rating';

const productReview = [{ idproduct: null, review: '', rating: null }]
class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyTransactions: [],
      modal: false,
      modalUpload: false,
      detailTransactions: [],
      file: Upload,
      fileUpload: null,
      alertMessage: "",
      color: "",
      alertUpload: false,
      idtransaction: null,
      statusTrans: 4,
      activeIndex: 0,
      modalType: 'detail',
      productReview: []
    };
    this.handleChange = this.handleChange.bind(this);

    this.items = [
      { label: 'Request', icon: 'pi pi-fw pi-question', status: 4 },
      { label: 'Waiting Confirmation', icon: 'pi pi-fw pi-inbox', status: 5 },
      { label: 'On Progress', icon: 'pi pi-fw pi-spinner', status: 1 },
      { label: 'Done', icon: 'pi pi-fw pi-check', status: 2 },
      { label: 'Reject', icon: 'pi pi-fw pi-times', status: 3 }
    ];
  }

  componentDidMount = () => {
    this.getTransactionHistory();
    // this.getDetailTransactions();
  };

  getDetailTransactions = async (idtransaction) => {
    try {
      let res = await HTTP.get(`/user/detail-transactions/${idtransaction}`)
      this.setState({ detailTransactions: res.data })
      console.log("detail trans", res.data)
    } catch (error) {
      console.log(error)
    }
    // HTTP.get(`/user/detail-transactions/${idtransaction}`)
    //   .then((res) => {
    //     this.setState({
    //       detailTransactions: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  handleChange(e) {
    // eslint-disable-next-line) {
    if (e.target.files[0]) {
      // var reader = new FileReader();
      this.setState({
        fileName: e.target.files[0].name,
        fileUpload: e.target.files[0],
        file: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      this.setState({
        fileName: "Select file",
        fileUpload: null,
        file: this.state.file,
      });
    }
  }

  onProductReviewChange = (rating, idproduct, index, idtransaction) => {
    console.log(rating, idproduct, idtransaction)
    this.state.productReview[index] = { idproduct, rating, idtransaction }
    this.setState({ productReview: this.state.productReview }, () => console.log("after", this.state.productReview))
  }

  onInputChange = (review, index) => {
    this.state.productReview[index] = { ...this.state.productReview[index], review }
    this.setState({ productReview: this.state.productReview }, () => console.log("after IC", this.state.productReview))
  }

  onBtnSubmitReview = async () => {
    try {
      await HTTP.post('/product/review', this.state.productReview)
      this.getTransactionHistory()
      this.getTransactionHistory()
      this.setState({ modal: !this.state.modal })
    } catch (error) {
      console.log(error)
    }
  }
  printModal = (modalType) => {
    if (modalType == 'detail') {
      return (
        <>
          <Modal isOpen={this.state.modal}>
            <ModalBody>
              <Container>
                <Row>
                  <div className="d-flex justify-content-between ">
                    <p></p>
                    <Button
                      color="danger"
                      onClick={() => {
                        this.setState({ modal: !this.state.modal });
                      }}
                    >
                      X
                    </Button>
                  </div>
                  <hr className="mt-3" />
                  {this.state.detailTransactions.slice(0, 1).map((item, idx) => {
                    return (
                      <>
                        {" "}
                        <Col md="6">
                          <p>
                            Recipient : <br />
                            {item.recipient}
                          </p>
                        </Col>
                        <Col md="6">
                          <p>
                            Address : <br />
                            {item.address}, {item.postal_code}
                          </p>
                        </Col>
                      </>
                    );
                  })}

                  <Col md="6"></Col>
                </Row>
              </Container>
              <hr />
              <Container>
                <Row>
                  {this.state.detailTransactions.map((item, idx) => {
                    return (
                      <>
                        <Col md="4">
                          <img src={item.image_url} width="100%" />
                        </Col>
                        <Col md="8 mt-3">
                          <p>
                            <strong>{item.product_name}</strong>
                            <br />
                            {item.brand}
                          </p>
                          <p>
                            Rp.{item.pack_price.toLocaleString()} X {item.qty_buy}
                          </p>
                        </Col>
                        <hr />
                      </>
                    );
                  })}
                </Row>
              </Container>
              <Container>
                <Row>
                  {this.state.detailTransactions.splice(0, 1).map((item, idx) => {
                    return (
                      <>
                        <Col md="4">Total</Col>
                        <Col md="8">Rp.{item.total_price.toLocaleString()}</Col>
                      </>
                    );
                  })}
                </Row>
              </Container>
            </ModalBody>
          </Modal>
        </>
      );
    } else if (modalType == 'review') {
      return (
        <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })}>
          <ModalHeader>Review</ModalHeader>

          <Container className="p-3">
            {this.state.detailTransactions.map((item, idx) => {

              return (
                <>
                  {/* <img src={item.image_url} height="30%" /> */}
                  <strong>{idx + 1}. {item.product_name}</strong>
                  <br />
                  <div className="d-flex">
                    <span>Rating : </span>
                    <Rating value={this.state.productReview[idx] && this.state.productReview[idx].rating} onChange={(e) => this.onProductReviewChange(e.value, item.idproduct, idx, item.idtransaction)} className="mx-1" />
                  </div>
                  <Form>
                    <FormGroup>
                      <Label>Review :</Label>
                      <Input value={this.state.productReview[idx] && this.state.productReview[idx].review} onChange={(e) => this.onInputChange(e.target.value, idx)} />
                    </FormGroup>
                  </Form>
                  <br />
                </>
              );
            })}
            <Button className="my-2" onClick={this.onBtnSubmitReview}>
              Submit Review
            </Button>
          </Container>
        </Modal>
      )
    }
  };

  getTransactionHistory = (status) => {
    if (status) {
      console.log("status trans", status)
      let value = `?id_transaction_status=${status}`;

      HTTP.get(`/user/sort-transactions${value}`)
        .then((res) => {
          this.setState({
            historyTransactions: res.data,
          });

          console.log("res history", res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let value = ``;

      HTTP.get(`/user/sort-transactions${value}`)
        .then((res) => {
          this.setState({
            historyTransactions: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  onBtnTransactionProof = () => {
    let formData = new FormData();
    let data = {
      idtransaction: this.state.idtransaction,
      id_transaction_status: 5,
    };
    formData.append("data", JSON.stringify(data));
    formData.append("images", this.state.fileUpload);

    let token = localStorage.getItem("tkn_id");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (this.state.fileUpload !== null) {
      axios
        .post(URL_API + `/user/upload-transaction`, formData, headers)
        .then((res) => {
          this.setState({
            modalUpload: !this.state.modalUpload,
            alertUpload: !this.state.alertUpload,
            color: "success",
            alertMessage: res.data.message,
          });
          this.onTabChange(4)
          this.getTransactionHistory(4)

        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  printModalUploadTransactions = () => {
    return (
      <>
        <Modal isOpen={this.state.modalUpload}>
          <div className="d-flex justify-content-between header-upload">
            <p>UPLOAD PAYMENT PROOF</p>

            <Button
              outline
              color="danger"
              onClick={() => {
                this.setState({ modalUpload: !this.state.modalUpload });
              }}
            >
              X
            </Button>
          </div>

          <ModalBody className="body-upload">
            <Container>
              <Col md="12 pb-5">
                <Container className="contain-upload">
                  <Row>
                    <Col md="12" className="card-upload">
                      <center className="mt-3">
                        <img
                          src={this.state.file}
                          width="250px"
                          height="200px"
                        />
                      </center>
                    </Col>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <div class="image-upload">
                        <label for="file-input">
                          <div className="btn-getstarted mt-3">
                            <a>
                              <span>
                                <FontAwesomeIcon icon={faCamera} />
                              </span>{" "}
                              UPLOAD
                            </a>
                          </div>
                        </label>

                        <input
                          id="file-input"
                          type="file"
                          max-files="2000"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {this.state.file !== Upload && (
                      <>
                        <Button
                          color="primary"
                          className="btn-upload mt-4"
                          onClick={() => {
                            this.onBtnTransactionProof();
                          }}
                        >
                          SUBMIT
                        </Button>
                      </>
                    )}
                  </Row>
                </Container>
                {/* <h6>Upload Your Proof Transactions</h6> */}
              </Col>
            </Container>
          </ModalBody>
        </Modal>
      </>
    );
  };

  onTabChange = (status) => {
    this.getTransactionHistory(status)
    let index = this.items.findIndex(item => item.status == status)
    this.setState({ activeIndex: index })
  }
  render() {
    console.log("waw", this.state.historyTransactions);
    // console.log("detran", this.state.detailTransactions);
    return (
      <Col md="10 mt-5">
        {this.printModalUploadTransactions()}
        <Container style={{ height: '100vh' }}>
          {this.printModal(this.state.modalType)}
          <Row>
            <Col md="12">
              <TabMenu model={this.items} onTabChange={(e) => this.onTabChange(e.value.status)} activeIndex={this.state.activeIndex} />
            </Col>
            <Col md="12 mt-2">
              <Alert isOpen={this.state.alertUpload} >
                {this.state.alertMessage}
              </Alert>
            </Col>
            {
              this.state.historyTransactions.length > 0 ?
                this.state.historyTransactions.map((item) => {
                  return (
                    <>
                      <Col md="12">
                        <Card
                          body
                          style={{
                            borderRadius: "15px",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            marginTop: "1%",
                            border: "none",
                          }}
                        >
                          <Container>
                            <Row>
                              <Col md="4">
                                <CardTitle tag="h6">Invoice</CardTitle>
                                <CardText>{item.invoice}</CardText>
                              </Col>
                              <Col md="3">
                                <CardTitle tag="h6">Recipient Name</CardTitle>
                                <CardText>{item.recipient}</CardText>
                              </Col>
                              <Col md="2">
                                <CardTitle tag="h6">Status</CardTitle>
                                <CardText>{item.status_name}</CardText>
                              </Col>
                              <Col
                                md="3"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  color="warning"
                                  onClick={() => {
                                    this.setState({ modal: !this.state.modal, modalType: 'detail' });
                                    this.getDetailTransactions(item.id);
                                  }}
                                >
                                  Detail
                                </Button>
                                &nbsp; &nbsp;
                                {item.status_name === "request" && (
                                  <>
                                    <Button
                                      color="primary"
                                      onClick={() => {
                                        this.setState({
                                          modalUpload: !this.state.modalUpload,
                                          idtransaction: item.id,
                                        });
                                      }}
                                    >
                                      Upload
                                    </Button>
                                  </>
                                )}
                                {
                                  item.status_name === "done" && (
                                    <Button
                                      color="success"
                                      onClick={() => {
                                        this.getDetailTransactions(item.id)
                                        this.setState({ modal: !this.state.modal, modalType: 'review' })
                                      }}
                                      disabled={parseInt(item.review)}>
                                      {
                                        parseInt(item.review) ?
                                          'Product Reviewed' :
                                          'Review Product'
                                      }
                                    </Button>
                                  )
                                }

                              </Col>
                            </Row>
                          </Container>
                        </Card>
                      </Col>
                    </>
                  );
                })
                :
                <h6>No records found</h6>
            }
          </Row>
        </Container>
      </Col>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    ...authReducer
  }
}
export default connect(mapStateToProps)(TransactionPage);
