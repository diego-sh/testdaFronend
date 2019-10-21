

import { SendPostRequestToService } from './comunication-handler'


var TransactionsClient = {
    SaveClient: { transactionName: "ClientSave", transactionCode: "TxQQRClientSave", parameters: {}, },
    GetAllClient: { transactionName: 'GetAllClient', transactionCode: 'TxQQRGetAllClient', parameters: {} },
    DeleteClient: { transactionName: 'DeleteClient', transactionCode: 'TxQQRDeleteClient', parameters: {} }
}

export function SaveClient(data, addFunction) {
    var transaction = TransactionsClient.SaveClient;
    transaction.parameters = {};
    transaction.parameters = data;
    SendPostRequestToService(transaction, addFunction, 'TxClient');
}

export function GetAllClient(addFunction) {
    console.log('ngreso')
    var transaction = TransactionsClient.GetAllClient;
    transaction.parameters = {};
    SendPostRequestToService(transaction, addFunction, 'TxClient');
}

export function DeleteClient(data, addFunction) {
    var transaction = TransactionsClient.DeleteClient;
    transaction.parameters = {};
    transaction.parameters = data;
    SendPostRequestToService(transaction, addFunction, 'TxClient');
}


