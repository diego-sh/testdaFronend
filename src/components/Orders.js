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
        };
        that = this;
    }

    componentWillMount(){
        debugger
        GetAllOrders(function(data,status,msg){
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
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Listado Ordenes </div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
        </div>;
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card">
                        <h1>Ordenes</h1>
                    </div>
                </div>
                <div className="p-col-12 p-lg-12">
                    <div className="card">
                        <DataTable value={this.state.orders} paginator={true} rows={10} header={header} footer={footer}
                            selectionMode="single" selection={this.state.selectedCar} onSelectionChange={e => this.setState({ selectedCar: e.value })}
                            onRowSelect={this.onCarSelect}>
                            <Column field="date" header="Fecha" sortable={true} />
                            <Column field="Cliente" header="Ciente" sortable={true} />
                            <Column  header="Detalle" sortable={true} />
                        </DataTable>

                    </div>
                </div>
            </div>
        );
    }
}