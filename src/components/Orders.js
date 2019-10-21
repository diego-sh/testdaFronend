import React, { Component } from 'react';
import { CarService } from '../service/CarService';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Lightbox } from 'primereact/lightbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

/* =========== T R A N S A C C I O N E S  ================= */
import { DeleteOrder, GetAllOrders, SaveOrder } from '../api/TransactionsOrders'

var that;
export class OrderView extends Component {
    constructor() {
        super();
        this.state = {
            orders: null,
            visible: false,
            detail: null,
        };
        that = this;
        this.viewDetail = this.viewDetail.bind(this);
        this.detailTemplate = this.detailTemplate.bind(this);
    }

    nameTemplate(rowData, column) {
        return (
            <div>
                <span>{rowData.client.name + ' ' + rowData.client.lastName}</span>
            </div>
        );
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
                    </div>
                </div>
            </div>
        );
    }
}