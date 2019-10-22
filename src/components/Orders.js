import React, { Component } from 'react';
import { CarService } from '../service/CarService';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Lightbox } from 'primereact/lightbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

/* =========== T R A N S A C C I O N E S  ================= */
import { DeleteOrder, GetAllOrders, SaveOrder } from '../api/TransactionsOrders'
import { GetAllClient } from '../api/Transactions'
import { GetAllArticles } from '../api/TransactionsArticle'

var that;
export class OrderView extends Component {
    constructor() {
        super();
        this.state = {
            orders: null,
            visible: false,
            detail: null,
            client: null,
            listClient: [],
            listArticle: [],
            optionClient: null,
            optionArticle: null,
            quantity: null,
            detail: [],
            stock: null

        };
        that = this;
        this.viewDetail = this.viewDetail.bind(this);
        this.detailTemplate = this.detailTemplate.bind(this);
        this.converterDataCatalogArticle = this.converterDataCatalogArticle.bind(this);
        this.converterDataCatalogClient = this.converterDataCatalogClient.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onDropdownChangeArticle = this.onDropdownChangeArticle.bind(this);
        this.onDropdownChangeClient = this.onDropdownChangeClient.bind(this);
        this.savingOrder = this.savingOrder.bind(this);
    }

    nameTemplate(rowData, column) {
        if (rowData.client !== null) {
            return (
                <div>
                    <span>{rowData.client.name + ' ' + rowData.client.lastName}</span>
                </div>
            );
        }

    }

    detailTemplate(rowData, column) {
        return (
            <Button label='Ver Detalle' icon='fa fa-search' onClick={() => this.viewDetail(rowData)} />
        );
    }

    totalTemplate(rowData, column) {
        var total = rowData.quantity * rowData.article.unitCost;
        return (<spam>{total}</spam>);
    }

    viewDetail(data) {
        console.log('Dialog')
        this.setState({ detail: data.detail, visible: true })
    }
    onDropdownChangeArticle(event) {
        var stock;
        this.state.listArticle.map(function (i) {
            if (i.id == event.value)
                stock = i.stock;
        })
        this.setState({ article: event.value, stock: stock });
    }

    onDropdownChangeClient(event) {
        this.setState({ client: event.value });
    }

    converterDataCatalogClient(data) {
        var listOptions = [];
        data.map(function (d) {
            var c = { label: '', value: '' }
            c.label = d.name;
            c.value = d.id;
            listOptions.push(c);
        })
        this.setState({ optionClient: listOptions });
    }

    converterDataCatalogArticle(data) {
        var listOptions = [];
        data.map(function (d) {
            var c = { label: '', value: '' }
            c.label = d.name;
            c.value = d.id;
            listOptions.push(c);
        })
        this.setState({ optionArticle: listOptions });
    }

    componentWillMount() {
        debugger
        GetAllOrders(function (data, status, msg) {
            console.log(data);
            switch (status) {
                case 'OK':
                    that.setState({ orders: data });
                    break;
                case 'ERROR':
                    that.showMessage(msg, 'error');
                    break;
                default:
                    that.showMessage(msg, 'info');
                    break;
            }
        })
        GetAllClient(function (data, status, msg) {
            console.log(data);
            switch (status) {
                case 'OK':
                    that.setState({ listClient: data });
                    that.converterDataCatalogClient(data);
                    break;
                case 'ERROR':
                    that.showMessage(msg, 'error');
                    break;
                default:
                    that.showMessage(msg, 'info');
                    break;
            }
        })

        GetAllArticles(function (data, status, msg) {
            console.log(data);
            switch (status) {
                case 'OK':
                    that.setState({ listArticle: data });
                    that.converterDataCatalogArticle(data);
                    break;
                case 'ERROR':
                    that.showMessage(msg, 'error');
                    break;
                default:
                    that.showMessage(msg, 'info');
                    break;
            }
        })
    }

    savingOrder() {
        if (this.state.client !== null) {
            var order = { idClient: null, detail: [] }
            order.idClient = this.state.client;
            order.detail = this.state.detail;
            SaveOrder(order, function (data, status, msg) {
                switch (status) {
                    case 'OK':

                        that.setState({ orders: data, detail: [], quantity: null, client: null, article: null });
                        break;
                    case 'ERROR':
                        that.showMessage(msg, 'error');
                        break;
                    default:
                        that.showMessage(msg, 'info');
                        break;
                }
            })
        }else{
            alert('Error Seleccione un cliente')
        }


    }

    addItem() {
        var item = { article: null, quantity: null };

        this.state.listArticle.map(function (i) {
            if (that.state.article == i.id) {
                item.article = i;
            }
        })

        if (item.article !== null) {
            if (this.state.quantity > item.article.stock) {
                alert('Stock insuficiente');
            } else {
                item.quantity = this.state.quantity;
                this.state.detail.push(item);
            }
        } else {
            alert('Error Escoja un Articulo');
        }

    }


    render() {
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Listado Ordenes </div>;

        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card">
                        <h1>Ordenes</h1>
                    </div>
                </div>
                <div className="p-col-12 p-lg-12">
                    <div className="card">
                        <DataTable value={this.state.orders} paginator={true} rows={10} header={header}>
                            <Column field="date" header="Fecha" sortable={true} />
                            <Column header="Ciente" body={this.nameTemplate} />
                            <Column header="Detalle" body={this.detailTemplate} />
                        </DataTable>
                        <Dialog header="Detalle" visible={this.state.visible} style={{ width: '50vw' }} onHide={() => this.setState({ visible: false })} >
                            <DataTable value={this.state.detail} paginator={true} rows={10} header='Detalle Artículos'>
                                <Column field="quantity" header="Cantidad" />
                                <Column field="article.name" header="Detalle" />
                                <Column field='article.unitCost' header="Precio Unitario" />
                                <Column header="Total" body={this.totalTemplate} />
                            </DataTable>
                        </Dialog>
                        <br />
                        <br />
                        <br />
                        <div className="p-col-12 p-lg-12" >
                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}> Ingresar Orden</span>
                        </div>

                        <div className="p-grid p-fluid">
                            <div className="p-col-3" >
                                <label htmlFor="float-input">Cliente</label>
                                <Dropdown options={this.state.optionClient} value={this.state.client} onChange={this.onDropdownChangeClient} autoWidth={false} placeholder="Selecione" />
                            </div>
                            <br />
                            <div className='p-col-3'>
                                <label htmlFor="float-input">Articulo</label>
                                <Dropdown options={this.state.optionArticle} value={this.state.article} onChange={this.onDropdownChangeArticle} autoWidth={false} placeholder="Selecione" />
                            </div>
                            <div className='p-col-1'>
                                <label htmlFor="float-input">Stock</label>
                                <InputText value={this.state.stock} disabled />
                            </div>
                            <div className='p-col-2'>
                                <label htmlFor="float-input">Cantidad</label>
                                <InputText placeholder='cantidad' value={this.state.quantity} onChange={(e) => this.setState({ quantity: e.target.value })} />
                            </div>
                            <div className='p-col-2'>
                                <br />
                                <Button label='Añadir' onClick={() => this.addItem()} />
                            </div>

                        </div>
                        <div className="p-col-12 p-lg-12" >
                            <DataTable value={this.state.detail} rows={10} style={{ width: '70%' }} >
                                <Column field="quantity" header="Cantidad" />
                                <Column field="article.name" header="Detalle" />
                                <Column field='article.unitCost' header="Precio Unitario" />
                                <Column header="Total" body={this.totalTemplate} />
                            </DataTable>

                            <Button label='Guardar Orden' style={{ width: '10%' }} onClick={() => this.savingOrder()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}