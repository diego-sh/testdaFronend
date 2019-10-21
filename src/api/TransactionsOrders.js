import { SendPostRequestToService } from './comunication-handler'


var TransactionsOrder = {
    SaveOrder: { transactionName: "OrderSave", transactionCode: "TxQQROrderSave", parameters: {}, },
    GetAllOrders: { transactionName: 'GetAllOrders', transactionCode: 'TxQQRGetAllOrders', parameters: {} },
    DeleteOrder: { transactionName: 'DeleteOrder', transactionCode: 'TxQQRDeleteOrder', parameters: {} }
}

export function SaveOrder(data, addFunction) {
    var transaction = TransactionsOrder.SaveOrder;
    transaction.parameters = {};
    transaction.parameters = data;
    SendPostRequestToService(transaction, addFunction, 'TxOrder');
}

export function GetAllOrders(addFunction) {
    var transaction = TransactionsOrder.GetAllOrders;
    transaction.parameters = {};
    SendPostRequestToService(transaction, addFunction, 'TxOrder');
}

export function DeleteOrder(data, addFunction) {
    var transaction = TransactionsOrder.DeleteOrder;
    transaction.parameters = {};
    transaction.parameters = data;
    SendPostRequestToService(transaction, addFunction, 'TxOrder');
}
