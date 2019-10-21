import React, { Component } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dialog } from 'primereact/dialog';
import { Lightbox } from 'primereact/lightbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

/* =========== T R A N S A C C I O N E S  ================= */
import { SaveClient, GetAllClient, DeleteClient } from '../api/Transactions'

var that;
export class ClientView extends Component {
    constructor() {
        super();
        this.state = {
            clients: null,
            name: null,
            lastName: null,
            ci: null,
            email: null,
            displayDialog: false,
            client: null,
            selectedClient: null,

        };
        that = this;
        this.createClient = this.createClient.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.addNew = this.addNew.bind(this);
        this.delete = this.delete.bind(this);
        this.findSelectedClientIndex = this.findSelectedClientIndex.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.onClientSelect = this.onClientSelect.bind(this);
        this.save = this.save.bind(this);
    }


    delete() {
        debugger;
        let index = this.findSelectedClientIndex();
        var clientAux = this.state.clients[index];
        DeleteClient(clientAux, function (data, status, msg) {
            switch (status) {
                case 'OK':
                    that.setState({
                        clients: that.state.clients.filter((val, i) => i !== index),
                        selectedClient: null,
                        client: null,
                        displayDialog: false
                    });
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

    findSelectedClientIndex() {
        return this.state.clients.indexOf(this.state.selectedClient);
    }

    updateProperty(property, value) {
        let client = this.state.client;
        client[property] = value;
        this.setState({ client: client });
    }

    onClientSelect(e) {
        this.newClient = false;
        this.setState({
            displayDialog: true,
            client: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newClient = true;
        this.setState({
            client: { ci: '', name: '', lastName: '', email: '' },
            displayDialog: true
        });
    }

    save() {
        let clients = [...this.state.clients];
        if (this.newClient) {
            //clients.push(this.state.client);
            this.createClient(this.state.client, 'create');
        } else {
            this.createClient(this.state.client, 'update');
        }



    }

    /* Metodo para guardar/actualizar Cliente */
    createClient(client, typeTx) {
        SaveClient(client, function (data, status, msg) {
            switch (status) {
                case 'OK':
                    var listClient = that.state.clients;
                    if (typeTx == 'create') {
                        listClient.push(data);
                    } else {
                        listClient[that.findSelectedClientIndex()] = data;
                    }
                    that.setState({ clients: listClient, selectedClient: null, client: null, displayDialog: false });

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

    /* Metodo para validad el formulario */
    validateForm() {
        var name = this.state.name;
        var lastName = this.state.lastName;
        var ci = this.state.ci;
        if (name == null || lastName == null || ci == null)
            return false;
        else
            return true;
    }

    componentWillMount() {
        debugger
        GetAllClient(function (data, status, msg) {
            console.log(data);
            switch (status) {
                case 'OK':
                    that.setState({ clients: data });
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
        let header = <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Listado Clientes </div>;

        let footer = <div className="p-clearfix" style={{ width: '8%' }}>
            <Button style={{ float: 'left' }} label="Añadir" icon="pi pi-plus" onClick={this.addNew} />
        </div>;
        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
            <Button label="Save" icon="pi pi-check" onClick={this.save} />
        </div>;

        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card">
                        <h1>Clientes</h1>
                    </div>
                </div>
                <div className="p-col-12 p-lg-12">
                    <div className="card">
                        <DataTable value={this.state.clients} paginator={true} rows={10} header={header} footer={footer}
                            selectionMode="single" selection={this.state.selectedClient} onSelectionChange={e => this.setState({ selectedClient: e.value })}
                            onRowSelect={this.onClientSelect}>
                            <Column field="ci" header="Cédula" sortable={true} />
                            <Column field="name" header="Nombre" sortable={true} />
                            <Column field="lastName" header="Apellido" sortable={true} />
                            <Column field="email" header="Correo" sortable={true} />
                        </DataTable>

                    </div>
                    <Dialog visible={this.state.displayDialog} width="300px" header="Cliente" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
                        {
                            this.state.client &&
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="ci">C.I</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="ci" onChange={(e) => { this.updateProperty('ci', e.target.value) }} value={this.state.client.ci} />
                                </div>

                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="name">Nombre</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="nombre" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.client.name} />
                                </div>

                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="lastName">Apellido</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="apeliido" onChange={(e) => { this.updateProperty('lastName', e.target.value) }} value={this.state.client.lastName} />
                                </div>

                                <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="email">Correo</label></div>
                                <div className="p-col-8" style={{ padding: '.5em' }}>
                                    <InputText id="corrreo" onChange={(e) => { this.updateProperty('email', e.target.value) }} value={this.state.client.email} />
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>
            </div>
        );
    }
}