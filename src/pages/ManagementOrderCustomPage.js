import React from 'react';
import {Container,Row,Col,Form,Button,Modal,ModalBody,Alert,FormFeedback,Label,Input,PaginationItem,PaginationLink,Pagination} from "reactstrap";
import { URL_API } from "../Helper";
import axios from "axios";
import "../assets/css/ManagementOrder.css"
import HTTP from "../service/HTTP.js";
import { connect } from "react-redux";
import { getProductAction } from "../action";

class ManagementOrderCustomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            historyTransactions:[],
            detailTransactions:[],
            modal:false,img_order:"",
            modalServe:false,
            products:[{idproduct: "", netto: "", unit: ""}],
            product:[],userTransactions:[],
            shippingCost:[],
            stock:[],
            invalid:false,
            alertMessage:"",
            alertInvalid:false,
            color:"",
            service:"",
            currentPage: 1,
            todosPerPage: 5,
         }
    }

    componentDidMount() {
        this.props.getProductAction(2)
        this.getTransactionHistory()
    }

    onBtnSubmit = () =>{
        let idtransaction = this.state.userTransactions.id;
        let products = this.state.products;
        let destination = this.state.userTransactions.destination;
        let postalCode = this.state.userTransactions.postal_code;
        let recipient = this.recipientForm.value;
        let note = this.state.userTransactions.note;
        let address = this.state.userTransactions.address;
        let expedition = this.state.userTransactions.expedition;
        let service = this.state.service;
        let shippingCost = this.state.shippingCost;
        console.log('cek submit cek 9',products,destination,postalCode,recipient,note,address,expedition,service,shippingCost)
        let token = localStorage.getItem("tkn_id");
        const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        };
        axios.post(URL_API + `/transaction/perscription`,{
            idtransaction:idtransaction,
            products:products,
            destination:destination,
            postalCode:postalCode,
            recipient:recipient,
            note:note,
            address:address,
            expedition:expedition,
            service:service,
            shippingCost:shippingCost
        },headers).then((res)=>{
            this.getTransactionHistory()
            alert(res.data.message)
            this.setState({modalServe:false})
        }).catch((err)=>{
            console.log(err)
        })
    }

    getDetailTransactions = (idtransaction) => {
        HTTP.get(`/user/detail-transactions/${idtransaction}`)
        .then((res) => {
            this.setState({
            detailTransactions: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    };

    getTransactionHistory = (val) => {
        let vals = `&id=${val}`
        if(val){
            let token = localStorage.getItem("tkn_id");
            const headers = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            axios.get(URL_API + `/user/sort-transactions?idtype=2${vals}`,headers)
                .then((res) => {
                this.setState({      
                    userTransactions: res.data[0],
                });
                this.getShippingCost()
                })
                .catch((err) => {
                console.log(err);
                });
        }else{
            let token = localStorage.getItem("tkn_id");
            const headers = {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            axios.get(URL_API + `/user/sort-transactions?idtype=2&id_transaction_status=4`,headers)
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

    getShippingCost = (address) => {
     return HTTP.post(`/transaction/shipping-cost`, {
        origin: 22,
        destination: this.destinationForm.value,
        weight: 1000,
      })
        .then((res) => {
            let cost = null
        res.data[parseInt(this.state.userTransactions.service)].cost.cost.map((item,idx)=>{
            return cost = item.value
        })
          this.setState({shippingCost:cost,service:res.data[parseInt(this.state.userTransactions.service)].cost.service})
        })
        .catch((error) => {
          return error;
        });
  };

    handleProducts = (e, index) => {
        HTTP.get(`/product/2?idproduct=${this.productVal.value}`)
        .then((res)=>{
            this.setState({product:res.data[0]})
            res.data[0].stock.map((item,idx)=>{
                this.setState({stock:item})
            })
        }).catch((err)=>{
            console.log(err)
        })
        if (e.target.value > this.state.stock.total_netto){
            e.target.value=this.state.stock.total_netto
            this.setState({ 
                invalid : true,
                alertMessage:`Stock not enough, 
                remaining stock is ${this.state.stock.total_netto}`,
                alertInvalid:true,
                color:"danger" 
            });
        }else{
            this.setState({ 
                invalid : false,
                alertInvalid:false 
            });
        }
        this.state.products[index] = {idproduct:parseInt(this.productVal.value),netto:this.state.product.netto,total_netto:parseInt(this.qtyVal.value),unit:this.unitVal.value,unit_price:this.state.stock.unit_price };
        this.setState({ products: this.state.products});
    };

    onBtAddProducts = () => {
        this.state.products.push(null);
        this.setState({ products: this.state.products });

    };

    handleRemoveFields = id => {
        const values  = [...this.state.products];
        values.splice(values.findIndex(value => value.id === id), 1);
        this.setState({products:values})
      }

    printProducts = () => {
        if (this.state.products.length >= 0) {
        return this.state.products.map((item, index) => {
            return (
            <Container fluid className="p-0">
                <Row>
                    <Col md="4"><Label>Product Name</Label>
                        <Input type="select" name="select" id="exampleSelect" innerRef={(e) => (this.productVal = e)} onChange={(e) => this.handleProducts(e, index)}>
                                <option value={0}>Choose Product</option>
                                {this.props.products.map((item,idx)=>{
                                    return(<><option value={item.idproduct}>{item.product_name}</option></>)  
                                })}
                        </Input>
                    </Col>
                    <Col md="3">
                            <Label>Netto</Label>
                            <Input type="number" innerRef={(e) => (this.qtyVal = e)} onChange={(e) => this.handleProducts(e, index)} max={this.state.stock.total_netto} invalid={this.state.invalid} />
                            {/* <FormFeedback invalid={this.state.invalid}>Stock not enough, remaining stock is {this.state.stock.total_netto}</FormFeedback> */}
                   </Col>
                    <Col md="3"><Label>Measure</Label>
                         <Input type="text" name="select" id="exampleSelect" innerRef={(e) => (this.unitVal = e)} value={this.state.product.unit} onChange={(e) => this.handleProducts(e, index)} disabled />
                    </Col>
                    <Col md="1 mt-4">
                                    {/* {this.printProducts()} */}
                                    <Button
                                    color="success"
                                    type="button"
                                    size="sm"
                                    style={{ float: "right" }}
                                    onClick={this.onBtAddProducts}
                                    >
                                    +
                                    </Button>
                                </Col>
                                <Col md="1 mt-4">
                                    {/* {this.printProducts()} */}
                                    <Button
                                    color="danger"
                                    type="button"
                                    size="sm"
                                    style={{ float: "right" }}
                                    onClick={()=>{this.handleRemoveFields(index)}}
                                    >
                                    -
                                    </Button>
                                    </Col>
                                    <Col md="12 mt-2"><Alert isOpen={this.state.alertInvalid} color={this.state.color} style={{fontSize:"11px"}}>{this.state.alertMessage}</Alert></Col>
                </Row>
            </Container>
            );
        });
        }
    };

    printModalDetail = () => {
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
                    <Col md="12">
                        <img src={`${URL_API}/${this.state.img_order}`} width="100%" />
                    </Col>
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
    };

    printModalServeProduct = () =>{
        return(
            <>
                <Modal isOpen={this.state.modalServe}>
                    <ModalBody>
                        <Container>
                            <Row>
                             <div className="d-flex justify-content-between ">
                    <p></p>
                    <Button
                        color="danger"
                        onClick={() => {
                        this.setState({ modalServe: !this.state.modalServe,products:[{idproduct: "",netto: "", total_netto: "", unit: ""}] });
                        }}
                    >
                        X
                    </Button>
                    </div>
                                <Col md="12">{this.printProducts()}</Col>
                                <Col md="6">
                                    <Label>Destination</Label>
                                    <Input type="select" name="select" id="exampleSelect" innerRef={(e) => (this.destinationForm = e)} disabled>
                                        <option value={this.state.userTransactions.id_city_destination}>{this.state.userTransactions.destination}</option>
                                    </Input>
                                </Col>
                                <Col md="6">
                                    <Label>Postal Code</Label>
                                    <Input type="text" value={this.state.userTransactions.postal_code} innerRef={(e) => (this.postal_codeForm = e)} disabled/>
                                </Col>
                                <Col md="6 mt-1">
                                    <Label>Recipient</Label>
                                    <Input type="text" value={this.state.userTransactions.recipient} innerRef={(e) => (this.recipientForm = e)} disabled/>
                                </Col>
                                <Col md="6 mt-1">
                                    <Label>Note</Label>
                                    <Input type="text" value={this.state.userTransactions.note} innerRef={(e) => (this.noteForm = e)} disabled/>
                                </Col>
                                <Col md="12 mt-1">
                                    <Label>Address</Label>
                                    <Input type="textarea" value={this.state.userTransactions.address} innerRef={(e) => (this.addressForm = e)} disabled/>
                                </Col>
                                <Col md="6 mt-1">
                                    <Label>Expedition</Label>
                                    <Input type="text" value={this.state.userTransactions.expedition} innerRef={(e) => (this.expeditionForm = e)} disabled/>
                                </Col>
                                <Col md="6 mt-1">
                                    <Label>Service</Label>
                                    <Input type="text" value={this.state.service} innerRef={(e) => (this.serviceForm = e)} disabled/>
                                </Col>
                                <Col md="12 mt-1">
                                    <Label>Shipping Cost</Label>
                                    <Input type="number" value={this.state.shippingCost} innerRef={(e) => (this.shippingCostForm = e)} disabled/>
                                </Col>
                                <Col md="12 mt-1">
                                    <Button color="primary" width="100%" onClick={()=>{this.onBtnSubmit()}}>Submit</Button>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
            </>
        )
    }

    render() { 
        // console.log('transaction history',this.state.historyTransactions)
        // console.log('detail history',this.state.detailTransactions)
        // console.log('products',this.state.product)
        // console.log('products props',this.props.products)
        // console.log('user',this.props.user)
        // console.log('shippingCost',this.state.shippingCost)
        // console.log('isi form products',this.state.products)
        // console.log('service',this.state.service)
        const { currentPage, todosPerPage } = this.state;
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = this.state.historyTransactions.slice(
        indexOfFirstTodo,
        indexOfLastTodo
        );

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (
        let i = 1;
        i <= Math.ceil(this.state.historyTransactions.length / todosPerPage);
        i++
        ) {
        pageNumbers.push(i);
        }
        return ( 
            <div className="main-content">
                    <main>
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                {this.printModalDetail()}
                                {this.printModalServeProduct()}
                                    <div className="wrapper rounded">
                                        <nav className="navbar navbar-expand-lg navbar-dark dark d-lg-flex align-items-lg-start"> <a className="navbar-brand" href="#" style={{color:"black"}}>Transactions <p className="pl-1">Serve Transactions</p> </a> 
                                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button> */}
                                        </nav>
                                        <Row className="mt-2 pt-2">
                                            <Col md="6" id="income">
                                                <div className="d-flex justify-content-start align-items-center" style={{color:"black"}}>
                                                    <p className="pi pi-credit-card"></p>
                                                    <p className=" mx-3" style={{color:"black"}}>Total Custom Order</p>
                                                    <p className=" money">{this.state.historyTransactions.length}</p>
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="d-flex justify-content-md-end align-items-center" style={{color:"black"}}>
                                                    <div><i className="pi pi-user"></i></div>
                                                    <div className="mx-3">{this.props.user.fullname}</div>
                                                    {/* <div className="text-white ml-4 money">{this.props.user.role}</div> */}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <ul className="nav nav-tabs w-75" >
                                                <li className="nav-item"> <a className="nav-link active" href="" style={{color:"black"}}>Request</a> </li>
                                                {/* <li className="nav-item"> <a className="nav-link" href="#">Reports</a> </li> */}
                                            </ul> 
                                            {/* <button className="btn btn-primary">New Transaction</button> */}
                                        </div>
                                        <div className="table-responsive mt-3">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" style={{color:"black"}}>Invoice</th>
                                                        <th scope="col" style={{color:"black"}}>Recipient</th>
                                                        <th scope="col" style={{color:"black"}}>Note</th>
                                                        <th scope="col" style={{color:"black"}}>Status</th>
                                                        <th scope="col" style={{color:"black"}}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {currentTodos.map((item,idx)=>{
                                                    return(
                                                        <>
                                                        {item.status_name === "request" &&(<><tr className="title-table">
                                                        <td>{item.invoice} </td>
                                                        <td>{item.recipient}</td>
                                                        <td>{item.note}</td>
                                                        <td>{item.status_name}</td>
                                                        <td><Button outline color="primary" onClick={() => {
                                                            this.setState({ modal: !this.state.modal,img_order:item.img_order_url });
                                                            this.getDetailTransactions(item.id);
                                                        }}>Detail</Button>&nbsp;&nbsp;<Button outline color="success" 
                                                        onClick={async()=>{await this.getTransactionHistory(item.id);
                                                        this.setState({modalServe:!this.state.modalServe});
                                                        }}>Serve</Button></td>
                                                        </tr></>)}
                                                        
                                                    </>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center results"> <span className="pl-md-3">Showing<b style={{color:"black"}}> 1-{pageNumbers} of {currentTodos.length} </b> trasactions</span>
                                            <div className="pt-3">
                                            <Container className="mt-4">
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
                                                                style={{color:"black"}}
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
                                            </div>
                                        </div>
                                    </div> 
                                </Col>
                            </Row>
                        </Container>
                    </main>
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
 
export default connect(mapStateToProps,{ getProductAction})(ManagementOrderCustomPage);