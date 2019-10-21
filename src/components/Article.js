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
import { SaveArticle, GetAllArticles, DeleteArticle } from '../api/TransactionsArticle'


var that;
export class ArticleView extends Component {
    constructor() {
        super();
        this.state = {
            articles: null,
        };
        that = this;
    }

    componentWillMount(){
        debugger
        GetAllArticles(function(data,status,msg){
            console.log(data);
         switch (status) {
             case 'OK':
                 that.setState({ articles: data });
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
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>Listado Artículos </div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
        </div>;

        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <h1>Articulos</h1>
                    </div>
                </div>

                <div className="p-col-12 p-lg-12">
                    <div className="card">
                        <DataTable value={this.state.articles} paginator={true} rows={10} header={header} footer={footer}
                            selectionMode="single" selection={this.state.selectedCar} onSelectionChange={e => this.setState({ selectedCar: e.value })}
                            onRowSelect={this.onCarSelect}>
                            <Column field="id" header="Código" sortable={true} />
                            <Column field="name" header="Nombre" sortable={true} />
                            <Column field="unitCost" header="Precio Unitario" sortable={true} />
                            <Column field="stock" header="Stock" sortable={true} />
                        </DataTable>

                    </div>
                </div>
            </div>
        );
    }
}