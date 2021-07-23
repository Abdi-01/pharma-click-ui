import axios from 'axios';
import React from 'react';
import '../components/SidebarComp.css'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
// import './ProductPack.css'
import { Tag } from 'primereact/tag';
import { connect } from 'react-redux';
import { getProductAction } from '../action'
import './ProductManagement.css'
import 'primeflex/primeflex.css';
import { productReducer } from '../reducer/ProductReducer';
import DialogProduct from '../components/DialogProduct';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../components/SidebarComp.css'
import DialogAdd from '../components/DialogAdd';
import { Toast } from 'primereact/toast';
import { URL_API } from '../Helper';

class ProductManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduk: [],
            loading: false,
            costumers: [],
            productDialog: false,
            productDetail: [],
            addDialog: false,
            notif: false
        }
    }

    componentDidMount() {

        this.props.getProductAction(1)
    }

    //COLUMN BODY
    bodyImage = (rowData) => {
        return <img src={rowData.images[0] ? ((rowData.images[0].includes('http') ? `${rowData.images[0]}` : `${URL_API}/${rowData.images[0]}`)) : '/'} style={{ height: '100px', width: '100px' }} />
    }

    bodyQty = (rowData) => {
        return rowData.stock.map((item, index) => {
            return (
                <>
                    <Row>{item.qty}</Row>
                </>
            )
        })
    }

    bodyType = (rowData) => {
        return rowData.stock.map((item, index) => {
            return (
                <>
                    <Row>{item.type}</Row>
                </>
            )

        })
    }

    bodyNetto = (rowData) => {
        return (
            <Row>
                {`${rowData.netto} ${rowData.unit}`}
            </Row>
        )
    }

    bodyPrice = (rowData) => {
        return (
            <>
                <Row>
                    IDR. {rowData.pack_price.toLocaleString()}
                </Row>
            </>
        )

    }

    bodyDescription = (rowData) => {
        return (<Row>{rowData.description}</Row>)
    }
    bodyEffect = (rowData) => {
        return (<Row>{rowData.effect ? rowData.effect.replace(/[+]/g, '\n') : null}</Row>)
    }
    bodyUsage = (rowData) => {
        return (<Row>{rowData.usage}</Row>)
    }
    bodyDosage = (rowData) => {
        return (<Row>{rowData.dosage}</Row>)
    }
    bodyIndication = (rowData) => {
        return (<Row>{rowData.indication.replace(/[+]/g, '\n')}</Row>)
    }

    editProduct = async (product) => {
        try {
            this.setState({
                productDetail: product,
                productDialog: true,
                addDialog: false
            });

        } catch (error) {

        }
    }

    actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning ml-1" onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    //TOOL BAR
    leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h4>Packed Product Management</h4>
            </React.Fragment>
        )
    }

    rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mx-3" onClick={() => this.setState({ addDialog: true })} />
                <Button label="Export" icon="pi pi-upload" className="p-button-danger" />
            </React.Fragment>
        )
    }

    inputChange = (e, property) => {
        const val = e.target.value
        let productDetail = { ...this.state.productDetail }
        productDetail[`${property}`] = val;
        this.setState({ productDetail })
    }

    stockChange = (e, property) => {
        const val = e.target.value
        let productDetail = { ...this.state.productDetail }
        productDetail.stock[`${property}`] = val;
        this.setState({ productDetail })
    }
    render() {
        let { productDetail, productDialog, addDialog } = this.state
        let headerGroup = <ColumnGroup>
            <Row >
                <Column header="Product" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Brand" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Stock" colSpan={3} style={{ textAlign: 'center' }} />
                <Column header="Price" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Image" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Description" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Side Effect" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Usage" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Dosage" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Indication" rowSpan={2} style={{ textAlign: 'center' }} />
                <Column header="Action" rowSpan={2} style={{ textAlign: 'center' }} />
            </Row>
            <Row>
                <Column header="Netto" style={{ textAlign: 'center' }} />
                <Column header="Qty" style={{ textAlign: 'center' }} />
                <Column header="Type" style={{ textAlign: 'center' }} />
            </Row>
        </ColumnGroup>;

        return (
            <div class="main-content">
                <main>
                    {/* TOAST NOTIFICATION */}
                    <Toast ref={(el) => this.toast = el} />
                    <Toolbar className="p-mb-4 mb-3" left={this.leftToolbarTemplate} right={this.rightToolbarTemplate} ></Toolbar>
                    <div className="datatable-style">
                        <div className="card">
                            <DataTable value={this.props.dataProduk} headerColumnGroup={headerGroup} paginator rows={3} className="p-datatable-sm" showGridlines scrollable style={{ width: 'auto' }} className="datatable-style">
                                <Column field="product_name" headerStyle={{ width: '200px' }}></Column>
                                <Column field="brand" headerStyle={{ width: '120px' }} ></Column>
                                <Column body={this.bodyNetto} headerStyle={{ width: '100px' }}></Column>
                                <Column body={this.bodyQty} headerStyle={{ width: '100px' }}></Column>
                                <Column body={this.bodyType} headerStyle={{ width: '100px' }}></Column>
                                <Column body={this.bodyPrice} headerStyle={{ width: '110px' }}></Column>
                                <Column body={this.bodyImage} headerStyle={{ width: '150px' }}></Column>
                                <Column body={this.bodyDescription} headerStyle={{ width: '500px' }}></Column>
                                <Column body={this.bodyEffect} headerStyle={{ width: '300px' }}></Column>
                                <Column body={this.bodyUsage} headerStyle={{ width: '150px' }}></Column>
                                <Column body={this.bodyDosage} headerStyle={{ width: '250px' }}></Column>
                                <Column body={this.bodyIndication} headerStyle={{ width: '350px' }}></Column>
                                <Column body={this.actionBodyTemplate} headerStyle={{ width: '150px' }} ></Column>
                            </DataTable>
                        </div>
                    </div>

                    {/* DIALOG */}
                    <DialogProduct productDetail={productDetail} productDialog={productDialog} hide={() => this.setState({ productDialog: false })} inputChange={(e, property) => { this.inputChange(e, property) }} stockChange={(e, property) => this.stockChange(e, property)} />
                    <DialogAdd productDetail={productDetail} addDialog={addDialog} hide={() => this.setState({ addDialog: false })} inputChange={(e, property) => { this.inputChange(e, property) }} stockChange={(e, property) => this.stockChange(e, property)} toast={() => this.toast.show({ severity: 'success', summary: 'Success!', detail: 'Add Product success!', life: 3000 })} />
                </main>
            </div>
        );
    }
}

const mapStateToProps = ({ productReducer }) => {
    return {
        dataProduk: productReducer.product_list
    }
}

export default connect(mapStateToProps, { getProductAction })(ProductManagementPage);